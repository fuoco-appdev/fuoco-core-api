// deno-lint-ignore-file no-explicit-any no-unused-vars require-await ban-unused-ignore
/* eslint-disable @typescript-eslint/no-explicit-any */
export function Post(path: string) {
    return function (
      target: Record<string, any>,
      key: string,
      descriptor: PropertyDescriptor,
    ) {
      target.prototype.postEndpoints = target.prototype["postEndpoints"] ?? [];
      target.prototype.postEndpoints.push({
          path,
          key,
          handler: descriptor.value,
      });
    };
  }