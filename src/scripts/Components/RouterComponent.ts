import { Component } from '../Framework/Component';
import { Router } from '../Framework/Router/Router';
import { ComponentList } from '../Framework/types';
import { GetRandomString } from '../Framework/Utils/RandomString';
import { pagesRoutes } from '../pages';
import { router } from '../router';

type RouterComponentProps = {
  linkText: string;
  router: Router;
  page: string;
  classNames: string;
};

export class RouterComponent extends Component {
  public static defaultProps: RouterComponentProps;

  private routeId: string | null | undefined;
  private _link: HTMLElement | null | undefined;

  constructor(props: RouterComponentProps, componentList: ComponentList[]) {
    super(
      {
        ...RouterComponent.defaultProps,
        ...props,
      },
      componentList,
    );
    this.goToComp = this.goToComp.bind(this);
  }

  addListener(): void {
    if (!this.routeId) return;
    this._link = document.getElementById(this.routeId);

    if (!this._link) return;
    this._link.addEventListener('click', this.goToComp);
  }

  removeListener(): void {
    if (this._link) {
      this._link.removeEventListener('click', this.goToComp);
    }
  }

  goToComp(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();

    const router = this.props.router as Router;
    if (!router) throw Error('incorrect router in RouterComponent');

    router.go(('/' + this.props.page) as string);
  }

  componentDidMount(): void {
    this.addListener();
  }

  componentWillUpdate(): boolean {
    this.removeListener();
    return true;
  }

  componentDidUpdate(): void {
    this.removeListener();
    this.addListener();
  }

  componentWillUnmount(): void {
    this.removeListener();
  }

  render(): string {
    this.routeId = GetRandomString();

    return `
      <a className="{{ classNames }}" id="${this.routeId}" href=''>{{ linkText }}</a>
    `;
  }
}

RouterComponent.defaultProps = {
  linkText: 'На главную',
  page: pagesRoutes.MAIN_PAGE,
  router: router,
  classNames: '',
};
