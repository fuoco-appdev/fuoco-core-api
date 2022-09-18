// deno-lint-ignore-file no-explicit-any
/* eslint-disable @typescript-eslint/no-explicit-any */
export function Options(path: string) {
    return function (
      target: Record<string, any>,
      key: string,
      descriptor: PropertyDescriptor,
    ) {
      target.prototype.optionsEndpoints = target.prototype.optionsEndpoints || [];
      target.prototype.optionsEndpoints.push({
        path,
        key,
        handler: descriptor.value,
      });
    };
  }