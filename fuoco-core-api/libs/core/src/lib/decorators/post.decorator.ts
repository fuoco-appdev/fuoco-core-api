/* eslint-disable @typescript-eslint/no-explicit-any */
// deno-lint-ignore-file no-explicit-any ban-ts-comment
// @ts-ignore
import { IController } from "../controller.ts";

export function Post(path: string) {
    return function (
      target: new (...args: any[]) => IController,
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