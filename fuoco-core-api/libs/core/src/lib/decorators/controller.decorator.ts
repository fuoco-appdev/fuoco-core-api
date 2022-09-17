// deno-lint-ignore-file no-explicit-any ban-types ban-unused-ignore
import { IController } from "../controller.ts";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Controller(path: string) {
    return function (target: new (...args: any[]) => IController) {
      target.constructor.prototype.path = path;
    };
}