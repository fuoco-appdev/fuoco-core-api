// deno-lint-ignore-file ban-ts-comment
// @ts-ignore
import { IController } from "../controller.ts";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Delete(path: string) {
    return function (
      target: Record<string, IController>,
      key: string,
      descriptor: PropertyDescriptor,
    ) {
      target.constructor.prototype.deleteEndpoints = target.constructor.prototype.deleteEndpoints || [];
      target.constructor.prototype.deleteEndpoints.push({
        path,
        key,
        handler: descriptor.value,
      });
    };
  }