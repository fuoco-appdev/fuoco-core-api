/* eslint-disable @typescript-eslint/no-explicit-any */
export function Put(path: string) {
    return function (
      target: Record<string, any>,
      key: string,
      descriptor: PropertyDescriptor,
    ) {
      target.constructor.prototype.putEndpoints = target.constructor.prototype.putEndpoints || [];
      target.constructor.prototype.putEndpoints.push({
        path,
        key,
        handler: descriptor.value,
      });
    };
  }