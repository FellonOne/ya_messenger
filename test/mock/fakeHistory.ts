export const fakeHistory: History = {
  back() {},
  forward() {},
  go(delta?: number) {},
  pushState(data: any, title: string, url?: string | null) {},
  length: 0,
} as History;
