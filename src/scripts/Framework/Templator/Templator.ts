import { Tree } from "../DataStruct/Tree";
import { Stack } from "../DataStruct/Stack";
import { ComponentList, ComponentProps, IComponent } from "../types";
import { Get } from "../Utils/Get";
import { autoCloseTag, TagList } from "./TagList";
import { Trim } from "../Utils/Trim";

export class StringTemplator {
  private readonly _propPattern = /\{\{(.*?)\}\}/gi;
  private readonly _attrPattern = /[A-Za-z]+\=\"(.*?)\"/gi;
  private readonly _tagPattern = /<\/?[^>]+(>|$)/g;

  constructor(
    private template: string,
    private componentList: ComponentList[]
  ) {}

  public compile(
    props: ComponentProps
  ): Tree<HTMLElement | Text | DocumentFragment> | null {
    const preparedTemplate = this.prepareTemplate(this.template.trim(), props);

    /**
     * Начинаем парсить строку, чтоб построить дерево
     */
    // Получаем все теги в шаблоне
    const tagsArray = preparedTemplate.match(this._tagPattern);

    // Если же тегов в шаблоне нет, то возвращаем текстовую HTML ноду
    if (tagsArray === null || tagsArray.length === 0) {
      return new Tree<HTMLElement | Text>(
        this.createTextElement(preparedTemplate)
      );
    }

    const stack = new Stack<RegExpMatchArray>();
    let tree: Tree<HTMLElement | Text | DocumentFragment> = new Tree<
      HTMLElement | Text | DocumentFragment
    >(document.createDocumentFragment());
    let prevTagInTemplate: RegExpMatchArray = [];

    // Если теги есть, начинаем перебор
    for (const tagName of tagsArray) {
      const regTag = this._tagPattern.exec(preparedTemplate);

      if (regTag === null)
        throw Error(
          `Ooops, something wrong in Templator => "${preparedTemplate}"`
        );

      if (this.isComponentTagName(tagName)) {
        const componentTree = this.createComponentTree(tagName, props);

        if (tree === null && componentTree !== null) {
          tree = componentTree;
          if (tagsArray.length !== 1)
            throw Error("one root on template or bad tree");
          break;
        } else {
          if (componentTree !== null) {
            tree.childrens.push(componentTree);
            componentTree.setParent(tree);
            // HTML Вставка
            tree.value.appendChild(componentTree.value);
          }
        }
      } else if (this.isCloseTagName(tagName)) {
        if (stack.size() === 0) {
          throw Error(
            `Stack is EMPTY => ${preparedTemplate}; || ${tagName}; || ${prevTagInTemplate};`
          );
        }

        stack.pop();
        const text = this.getTextNodeBetweenTag(
          preparedTemplate,
          prevTagInTemplate,
          regTag
        );
        if (text !== null && tree !== null) {
          tree.value.appendChild(text);
          const children = new Tree<HTMLElement | Text | DocumentFragment>(
            text
          );
          tree.childrens.push(children);
          children.setParent(tree);
        }

        if (tree !== null && tree?.parent) {
          tree = tree?.parent;
        }
      } else {
        if (stack.size() !== 0) {
          const text = this.getTextNodeBetweenTag(
            preparedTemplate,
            prevTagInTemplate,
            regTag
          );
          if (text !== null && tree !== null) {
            tree.value.appendChild(text);
            const children = new Tree<HTMLElement | Text | DocumentFragment>(
              text
            );
            tree.childrens.push(children);
            children.setParent(tree);
          }
        }

        const element = this.createHtmlElement(regTag[0]);
        if (tree === null) {
          tree = new Tree(element);
        } else {
          const newLeaves = new Tree<HTMLElement | Text | DocumentFragment>(
            element
          );
          newLeaves.setParent(tree);
          tree.childrens.push(newLeaves);
          /**
           * HTML Вставка!!!!
           */
          tree.value.appendChild(newLeaves.value);
          if (!this.isAutoCloseTag(regTag[0])) tree = newLeaves;
        }

        if (!this.isAutoCloseTag(regTag[0])) stack.push(regTag);
      }

      prevTagInTemplate = regTag;
    }

    return tree;
  }

  public textExistBetweenTag(
    startTag: RegExpMatchArray,
    endTag: RegExpMatchArray
  ): boolean {
    return (
      (!this.isCloseTagName(startTag[0]) && !this.isCloseTagName(endTag[0])) ||
      (startTag !== null &&
        this.isCloseTagName(startTag[0]) &&
        !this.isCloseTagName(endTag[0])) ||
      (startTag !== null &&
        this.isCloseTagName(startTag[0]) &&
        this.isCloseTagName(endTag[0])) ||
      !this.isCloseTagName(startTag[0])
    );
  }

  /**
   * Тег является самозакрывающимся
   * @param {string} tagName
   */
  public isAutoCloseTag(tagName: string): boolean {
    const newTagName = this.getComponentName(tagName);

    return autoCloseTag.has(newTagName);
  }

  /**
   * Создаем текстоовую ноду между тегами, если присутствует текст,
   * иначе, возвращаем null
   * @param {string} template
   * @param {RegExpMatchArray} startTag
   * @param {RegExpMatchArray} endTag
   */
  public getTextNodeBetweenTag(
    template: string,
    startTag: RegExpMatchArray,
    endTag: RegExpMatchArray
  ): Text | null {
    if (!this.textExistBetweenTag(startTag, endTag)) return null;

    const text = template
      .slice((startTag.index ?? 0) + startTag[0].length, endTag.index)
      .trim();

    return text.length > 0 ? this.createTextElement(text) : null;
  }

  /**
   * Является ли тег закрывающим
   * @param {string} tagName
   */
  public isCloseTagName(tagName: string): boolean {
    if (tagName.length === 0) return false;
    return tagName.trim().slice(1, 3).includes("/");
  }

  /**
   * Выдергиваем из тега имя компоненты
   * @param {string} tag
   */
  private getComponentName(tag: string): string {
    return Trim(tag, "<>\\//").split(" ")[0].trim();
  }

  /**
   * Является ли тег компонентом
   * @param {string} tagName
   */
  public isComponentTagName(tagName: string): boolean {
    const newTagName = this.getComponentName(Trim(tagName, `*.<>//\\'" `));

    return !TagList.has(newTagName);
  }

  /**
   * Создаем дерево из компонента
   * @param {string} tagName
   * @param {ComponentProps} props
   */
  public createComponentTree(
    tagName: string,
    props: ComponentProps
  ): Tree<HTMLElement | Text | DocumentFragment> | null {
    const newTagName = this.getComponentName(tagName);
    const CustomComponent: new (
      props: ComponentProps,
      componentList: ComponentList[]
    ) => IComponent =
      (Get(props, newTagName, null) as new (
        props: ComponentProps
      ) => IComponent) ??
      this.componentList.find((comp) => comp.name === newTagName)?.value;

    if (CustomComponent === null) {
      throw Error("Component do not get :(");
    }

    if (!CustomComponent) {
      throw Error(`Unknown Component -> ${newTagName}`);
    }
    const componentProps = this.createPropsByString(tagName, props);

    return new CustomComponent(componentProps, this.componentList).getTree();
  }

  /**
   * Создаем из строки <MyComp test={{test}} />
   * набор пропсов для компонента MyComp
   * @param {string} tagStr
   * @param {ComponentProps} props
   */
  public createPropsByString(
    tagStr: string,
    props: ComponentProps
  ): ComponentProps {
    const attributes = Trim(tagStr, "<>//\\").match(this._attrPattern);
    if (!attributes || attributes.length === 0) return {};

    const res: ComponentProps = {};

    for (const attr of attributes) {
      const [name, value] = attr.split("=");
      if (value.includes("**") && value.includes("**"))
        res[name] = Get(props, Trim(value, `* <>//\\'{}" `));
      else res[name] = this.typeOfValue(Trim(value, `'"<>//\\* `));
    }

    return res;
  }

  private typeOfValue(val: string): unknown {
    if (val === "true") return true;
    if (val === "false") return false;

    if (val === "null") return null;
    if (val === "undefined") return undefined;

    return val;
  }

  private getAttrList(tagName: string): { name: string; value: string }[] {
    const attrList = Trim(tagName, "<>//\\").match(this._attrPattern);
    if (attrList === null || attrList.length === 0) return [];

    const res: { name: string; value: string }[] = [];

    attrList.forEach((elem) => {
      const [attr, values] = elem.split("=");

      const trimValues = Trim(values, ` \\//<>=.'"`);
      if (trimValues === "null" || trimValues === "undefined") return;

      res.push({
        name: Trim(attr, " \\//<>=."),
        value: trimValues,
      });
    });

    return res;
  }

  /**
   * Создаем HTML элемент и (если есть) добавляем дочерний элементF
   * @param {string} tagNameWithoutEscape
   * @param {HTMLElement | Text | null} children
   */
  private createHtmlElement(
    tagNameWithoutEscape: string,
    children: HTMLElement | Text | null = null
  ): HTMLElement {
    const tagName = this.getComponentName(tagNameWithoutEscape);

    try {
      const element = document.createElement(tagName);
      const attributes = this.getAttrList(tagNameWithoutEscape);

      if (attributes.length) {
        attributes.forEach(({ value, name }) => {
          if (name === "className")
            element.classList.add(
              ...value.split(" ").map((s) => Trim(s, ` '"*<>//\\`))
            );
          else element.setAttribute(name, value);
        });
      }

      if (children !== null) element.appendChild(element);

      return element;
    } catch (error) {
      return {
        textContent: `HTML_ELEMENT => ${tagName}`,
        appendChild<T extends Node>(newChild: T): T {
          return newChild;
        },
      } as HTMLElement;
    }
  }

  /**
   * Создаем HTML Text ноду
   * @param {String} text
   */
  private createTextElement(text: string): Text {
    try {
      return document.createTextNode(text);
    } catch (error) {
      return {
        textContent: text,
        appendChild<T extends Node>(newChild: T): T {
          return newChild;
        },
      } as Text;
    }
  }

  /**
   * Вставляем в шаблонную строку переменные
   * @param {String} template
   * @param {ComponentProps} props
   */
  private prepareTemplate(template: string, props: ComponentProps): string {
    let key = null;
    const regExp = this._propPattern;

    while ((key = regExp.exec(template))) {
      if (key[1]) {
        const tmplValue = key[1].trim();
        const data = Get(props, tmplValue, "null");

        if (
          typeof data === "string" ||
          typeof data === "number" ||
          typeof data === "boolean"
        )
          template = template.replace(new RegExp(key[0], "gi"), String(data));
        if (Array.isArray(data))
          template = template.replace(new RegExp(key[0], "gi"), data.join(""));
      }
    }

    return template;
  }
}
