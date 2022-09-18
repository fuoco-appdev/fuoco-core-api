// deno-lint-ignore-file ban-ts-comment
// @ts-ignore
import { IController } from "../controller.ts";

export function Put(path: string) {
    return function (
      target: Record<string, IController>,
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