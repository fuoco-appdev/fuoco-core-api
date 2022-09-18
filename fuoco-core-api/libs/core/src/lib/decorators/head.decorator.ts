// deno-lint-ignore-file ban-ts-comment
// @ts-ignore
import { IController } from "../controller.ts";

export function Head(path: string) {
    return function (
      target: Record<string, IController>,
      key: string,
      descriptor: PropertyDescriptor,
    ) {
      target.constructor.prototype.headEndpoints = target.constructor.prototype.headEndpoints || [];
      target.constructor.prototype.headEndpoints.push({
        path,
        key,
        handler: descriptor.value,
      });
    };
  }