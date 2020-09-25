export class Tree {
    constructor(value) {
        this._value = value;
        this._parent = null;
        this._childrens = [];
    }
    get value() {
        return this._value;
    }
    get childrens() {
        return this._childrens;
    }
    get parent() {
        return this._parent;
    }
    setParent(parent) {
        this._parent = parent;
    }
    /**
     * Получаем родителя дерева
     * @param {Tree} tree
     */
    static getParent(tree) {
        if (tree._parent === null)
            return tree;
        else
            return this.getParent(tree._parent);
    }
}
//# sourceMappingURL=Tree.js.map