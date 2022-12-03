// deno-lint-ignore-file ban-types

export function Controller(path: string) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      path: string = path;
    };
  };
}
