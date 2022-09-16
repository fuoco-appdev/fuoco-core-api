/* eslint-disable @typescript-eslint/no-explicit-any */
export function Options(path: string) {
    return function (
      target: Record<string, any>,
      key: string,
      descriptor: PropertyDescriptor,
    ) {
      target.constructor.prototype.optionsEndpoints = target.constructor.prototype.optionsEndpoints || [];
      target.constructor.prototype.optionsEndpoints.push({
        path,
        key,
        handler: descriptor.value,
      });
    };
  }