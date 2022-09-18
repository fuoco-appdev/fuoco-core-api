// deno-lint-ignore-file no-explicit-any
/* eslint-disable @typescript-eslint/no-explicit-any */
export function Head(path: string) {
    return function (
      target: Record<string, any>,
      key: string,
      descriptor: PropertyDescriptor,
    ) {
      target.prototype.headEndpoints = target.prototype.headEndpoints || [];
      target.prototype.headEndpoints.push({
        path,
        key,
        handler: descriptor.value,
      });
    };
  }