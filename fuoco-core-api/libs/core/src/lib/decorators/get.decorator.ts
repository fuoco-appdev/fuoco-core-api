// deno-lint-ignore-file ban-ts-comment
// @ts-ignore
import { IController } from "../controller.ts";

export function Get(path: string) {
    return function (
      target: Record<string, IController>,
      key: string,
      descriptor: PropertyDescriptor,
    ) {
      target.constructor.prototype.getEndpoints = target.constructor.prototype.getEndpoints || [];
      target.constructor.prototype.getEndpoints.push({
        path,
        key,
        handler: descriptor.value,
      });
    };
  }