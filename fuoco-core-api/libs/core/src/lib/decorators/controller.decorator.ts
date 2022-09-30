// deno-lint-ignore-file ban-types

export function Controller(path: string) {
    return function(constructor: Function) {
      const prototype = Object.getPrototypeOf(constructor);
      prototype.path = path;
    };
}