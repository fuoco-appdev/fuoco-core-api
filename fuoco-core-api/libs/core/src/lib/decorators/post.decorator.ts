// deno-lint-ignore-file no-explicit-any
/* eslint-disable @typescript-eslint/no-explicit-any */

export function Post(path: string) {
    return function (
      target: Record<string, any>,
      key: string,
      descriptor: PropertyDescriptor,
    ) {
      const postEndpointsName = "postEndpoints";
      if (!Reflect.has(target, postEndpointsName)) {
        Reflect.set(target, postEndpointsName, []);
      }
      
      const postEndpoints = Reflect.get(target, postEndpointsName);
      postEndpoints.push({
        path,
        key,
        handler: descriptor.value,
      });
      Reflect.set(target, postEndpointsName, postEndpoints);
    };
  }