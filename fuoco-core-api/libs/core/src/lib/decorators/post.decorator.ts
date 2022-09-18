// deno-lint-ignore-file ban-ts-comment
// @ts-ignore
import { IController } from "../controller.ts";

export function Post(path: string) {
    return function (
      target: Record<string, IController>,
      key: string,
      descriptor: PropertyDescriptor,
    ) {
      target.constructor.prototype.postEndpoints = target.constructor.prototype.postEndpoints || [];
      target.constructor.prototype.postEndpoints.push({
        path,
        key,
        handler: descriptor.value,
      });
    };
  }