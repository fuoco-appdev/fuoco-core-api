/* eslint-disable @typescript-eslint/no-explicit-any */
// deno-lint-ignore-file no-explicit-any no-unused-vars ban-ts-comment
// @ts-ignore
import { GuardExecuter } from "../guard-executer.ts";
// @ts-ignore
import * as HttpError from "https://deno.land/x/http_errors@3.0.0/mod.ts";

export function Guard<T extends typeof GuardExecuter>(executer: T) {
    return function (
        target: Record<string, any>,
        key: string,
        descriptor: PropertyDescriptor,
      ) {
        const instance = new executer();
        instance.canExecuteAsync().then((canExecute: boolean) => {
          if (!canExecute) {
            descriptor.value = function(...args: any) {
              throw HttpError.createError(401, 'Not authorized!');
            }
          }
        });
        
        return target;
      }
}