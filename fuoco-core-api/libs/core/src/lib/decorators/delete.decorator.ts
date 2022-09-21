// deno-lint-ignore-file no-explicit-any
/* eslint-disable @typescript-eslint/no-explicit-any */
export function Delete(path: string) {
    return function (
      target: Record<string, any>,
      key: string,
      descriptor: PropertyDescriptor,
    ) {
      const prototype = Object.getPrototypeOf(target);
      prototype.deleteEndpoints = prototype.deleteEndpoints || [];
      prototype.deleteEndpoints.push({
        path,
        key,
        handler: descriptor.value,
      });

      return target;
    };
  }