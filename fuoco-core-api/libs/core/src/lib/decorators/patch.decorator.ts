// deno-lint-ignore-file ban-ts-comment
// @ts-ignore
import { IController } from "../controller.ts";

export function Patch(path: string) {
    return function (
      target: Record<string, IController>,
      key: string,
      descriptor: PropertyDescriptor,
    ) {
      target.constructor.prototype.patchEndpoints = target.constructor.prototype.patchEndpoints || [];
      target.constructor.prototype.patchEndpoints.push({
        path,
        key,
        handler: descriptor.value,
      });
    };
  }