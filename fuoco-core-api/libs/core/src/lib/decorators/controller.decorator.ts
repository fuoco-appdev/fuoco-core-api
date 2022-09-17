// deno-lint-ignore-file no-explicit-any ban-types
/* eslint-disable @typescript-eslint/no-explicit-any */
export function Controller(path: string) {
    return function (target: new (...args: any[]) => object) {
      target.prototype.path = path;
    };
}