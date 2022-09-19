// deno-lint-ignore-file no-explicit-any no-unused-vars require-await
/* eslint-disable @typescript-eslint/no-explicit-any */
export function Post(path: string) {
    return function (
      target: Record<string, any>,
      key: string,
      descriptor: PropertyDescriptor,
    ) {
      descriptor.value = async function (...args: any) {
        this.constructor.prototype.postEndpoints = this.constructor.prototype.postEndpoints || [];
        this.constructor.prototype.postEndpoints.push({
          path,
          key,
          handler: descriptor.value,
        });
      };
      
    };
  }