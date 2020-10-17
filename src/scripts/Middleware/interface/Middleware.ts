export interface Middleware {
  check(): Promise<boolean>;
}
