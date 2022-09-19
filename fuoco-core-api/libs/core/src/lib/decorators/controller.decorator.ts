
/* eslint-disable @typescript-eslint/no-explicit-any */
// deno-lint-ignore-file no-explicit-any ban-types ban-unused-ignore ban-ts-comment
// @ts-ignore
import { IController } from "../controller.ts";

export function Controller(path: string) {
    return function (target: new (...args: any[]) => IController) {
      target.constructor.prototype.path = path;
    };
}