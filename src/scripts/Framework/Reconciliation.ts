import { Tree } from "./DataStruct/Tree";

const enum NodeType {
  TEXT_NODE = 3,
}

export class Reconciliation {
  constructor(
    private prevTree: Tree<HTMLElement | Text | DocumentFragment>,
    private nextTree: Tree<HTMLElement | Text | DocumentFragment>
  ) {}

  init(): void {
    this.compareAndCommit(this.prevTree, this.nextTree);
  }

  private swapChild(
    left: HTMLElement | Text | DocumentFragment,
    right: HTMLElement | Text | DocumentFragment
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
    right: Tree<HTMLElement | Text | DocumentFragment>
  ): void {
    let lVal = left.value,
      rVal = right.value;

    if (
      lVal.nodeType !== NodeType.TEXT_NODE &&
      rVal.nodeType !== NodeType.TEXT_NODE
    )
      this.copyAttributes(lVal as HTMLElement, rVal as HTMLElement);

    if (left.childrens.length === 0 && right.childrens.length === 0) {
      if (left.value.textContent !== right.value.textContent) {
        left.value.textContent = right.value.textContent;
      }
    } else if (left.childrens.length !== right.childrens.length) {
      this.swapChild(lVal, rVal);
    } else if (left.childrens.length === right.childrens.length) {
      let wasBreak = false;
      for (let i = 0; i < left.childrens.length; i += 1) {
        if (
          left.childrens[i].value.nodeType !== right.childrens[i].value.nodeType
        ) {
          this.swapChild(lVal, rVal);
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
    b.getAttributeNames().forEach((attrName) => {
      const bAttr = b.getAttribute(attrName);
      if (bAttr !== null) {
        a.setAttribute(attrName, bAttr);
      } else {
        a.removeAttribute(attrName);
      }
    });
  }
}
