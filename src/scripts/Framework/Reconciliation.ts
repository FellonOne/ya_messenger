import { Tree } from './DataStruct/Tree';

const enum NodeType {
  TEXT_NODE = 3,
  FRAGMENT_NODE = 11,
}

export class Reconciliation {
  constructor(
    private prevTree: Tree<HTMLElement | Text | DocumentFragment>,
    private nextTree: Tree<HTMLElement | Text | DocumentFragment>,
  ) {}

  init(): void {
    this.cleanFragmentNodes(this.prevTree);
    this.cleanFragmentNodes(this.nextTree);
    this.compareAndCommit(this.prevTree, this.nextTree);
  }

  private getParent(
    tree: Tree<HTMLElement | Text | DocumentFragment>,
  ): Tree<HTMLElement | Text | DocumentFragment> | null {
    const parent = tree.parent;

    if (parent) {
      if (parent.value.nodeType !== NodeType.FRAGMENT_NODE) return parent;
      else return this.getParent(parent);
    } else {
      return tree;
    }
  }

  private cleanFragmentNodes(tree: Tree<HTMLElement | Text | DocumentFragment>): void {
    if (tree.parent && tree.parent.value.nodeType === NodeType.FRAGMENT_NODE) {
      const parent = this.getParent(tree);

      if (parent) {
        parent.childrens = parent.childrens.filter(
          (children) => tree.parent !== children && children !== tree,
        );
        parent.childrens.push(tree);
        tree.parent = parent;
      }
    }
    tree.childrens.forEach((children) => this.cleanFragmentNodes(children));
  }

  private swapChild(
    left: HTMLElement | Text | DocumentFragment,
    right: HTMLElement | Text | DocumentFragment,
  ): void {
    while (left.firstChild) {
      left.removeChild(left.firstChild);
    }

    while (right.firstChild) {
      left.appendChild(right.firstChild.cloneNode(true));
      right.removeChild(right.firstChild);
    }
  }

  private compareAndCommit(
    left: Tree<HTMLElement | Text | DocumentFragment>,
    right: Tree<HTMLElement | Text | DocumentFragment>,
  ): void {
    const lVal = left.value,
      rVal = right.value;

    if (
      ![NodeType.FRAGMENT_NODE, NodeType.TEXT_NODE].includes(lVal.nodeType) &&
      ![NodeType.FRAGMENT_NODE, NodeType.TEXT_NODE].includes(rVal.nodeType) &&
      lVal.nodeName === rVal.nodeName
    )
      this.copyAttributes(lVal as HTMLElement, rVal as HTMLElement);

    if (left.childrens.length === 0 && right.childrens.length === 0) {
      if (left.value.textContent !== right.value.textContent) {
        left.value.textContent = right.value.textContent;
      }
    } else if (left.childrens.length !== right.childrens.length) {
      this.swapChild(lVal, rVal);
      left.childrens = right.childrens;
    } else if (left.childrens.length === right.childrens.length) {
      let wasBreak = false;
      for (let i = 0; i < left.childrens.length; i += 1) {
        if (
          left.childrens[i].value.nodeType !== NodeType.FRAGMENT_NODE &&
          right.childrens[i].value.nodeType !== NodeType.FRAGMENT_NODE &&
          left.childrens[i].value.nodeName !== right.childrens[i].value.nodeName
        ) {
          this.swapChild(left.value, right.value);
          left.childrens = right.childrens;
          wasBreak = true;
          break;
        }
      }
      if (!wasBreak)
        for (let i = 0; i < left.childrens.length; i += 1) {
          this.compareAndCommit(left.childrens[i], right.childrens[i]);
        }
    }
  }

  private copyAttributes(a: HTMLElement, b: HTMLElement): void {
    try {
      b.getAttributeNames().forEach((attrName) => {
        const bAttr = b.getAttribute(attrName);
        if (bAttr !== null) {
          a.setAttribute(attrName, bAttr);
        } else {
          a.removeAttribute(attrName);
        }
      });
    } catch (error) {
      console.log(b.nodeType);
      console.log(a);
    }
  }
}
