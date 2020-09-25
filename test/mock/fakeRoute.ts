import { Route } from "../../src/scripts/Framework/Router/Route";
import { ComponentProps } from "../../src/scripts/Framework/types";

export class FakeRoute extends Route {
  leave() {}

  match(pathname: string): boolean {
    return true;
  }

  render(customProps: ComponentProps | null = null) {}
}
