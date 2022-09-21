// deno-lint-ignore-file no-explicit-any ban-types

export function Controller(path: string) {
    return function (target: new (...args: any[]) => object) {
      const prototype = Object.getPrototypeOf(target);
      prototype.path = path;

      return target;
    };
}