// deno-lint-ignore-file no-explicit-any
/* eslint-disable @typescript-eslint/no-explicit-any */
export function Patch(path: string) {
    return function (
      target: Record<string, any>,
      key: string,
      descriptor: PropertyDescriptor,
    ) {
      target.prototype.patchEndpoints = target.prototype.patchEndpoints || [];
      target.prototype.patchEndpoints.push({
        path,
        key,
        handler: descriptor.value,
      });
    };
  }