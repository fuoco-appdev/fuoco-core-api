// deno-lint-ignore-file ban-ts-comment
// @ts-ignore
import { IController } from "../controller.ts";

export function Options(path: string) {
    return function (
      target: Record<string, IController>,
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