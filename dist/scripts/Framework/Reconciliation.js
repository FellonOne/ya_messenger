export class Reconciliation {
    constructor(prevTree, nextTree) {
        this.prevTree = prevTree;
        this.nextTree = nextTree;
    }
    init() {
        this.compareAndCommit(this.prevTree, this.nextTree);
    }
    swapChild(left, right) {
        while (left.firstChild) {
            left.removeChild(left.firstChild);
        }
        while (right.firstChild) {
            left.appendChild(right.firstChild.cloneNode(true));
            right.removeChild(right.firstChild);
        }
    }
    compareAndCommit(left, right) {
        let lVal = left.value, rVal = right.value;
        if (lVal.nodeType !== 3 /* TEXT_NODE */ &&
            rVal.nodeType !== 3 /* TEXT_NODE */)
            this.copyAttributes(lVal, rVal);
        if (left.childrens.length === 0 && right.childrens.length === 0) {
            if (left.value.textContent !== right.value.textContent) {
                left.value.textContent = right.value.textContent;
            }
        }
        else if (left.childrens.length !== right.childrens.length) {
            this.swapChild(lVal, rVal);
        }
        else if (left.childrens.length === right.childrens.length) {
            let wasBreak = false;
            for (let i = 0; i < left.childrens.length; i += 1) {
                if (left.childrens[i].value.nodeType !== right.childrens[i].value.nodeType) {
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
    copyAttributes(a, b) {
        b.getAttributeNames().forEach((attrName) => {
            const bAttr = b.getAttribute(attrName);
            if (bAttr !== null) {
                a.setAttribute(attrName, bAttr);
            }
            else {
                a.removeAttribute(attrName);
            }
        });
    }
}
//# sourceMappingURL=Reconciliation.js.map