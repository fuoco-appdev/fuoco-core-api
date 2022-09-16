/* eslint-disable @typescript-eslint/no-explicit-any */
export function Controller(path: string) {
    return function (target: new (...args: any[]) => object) {
      target.prototype.path = path;
    };
}