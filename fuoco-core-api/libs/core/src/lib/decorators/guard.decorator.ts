// deno-lint-ignore-file ban-ts-comment no-unused-vars no-explicit-any

// @ts-ignore
import { GuardExecuter } from "../guard-executer.ts";
// @ts-ignore
import * as HttpError from "https://deno.land/x/http_errors@3.0.0/mod.ts";
// @ts-ignore
import { IController } from "../controller.ts";

export function Guard<T extends typeof GuardExecuter>(executer: T) {
    return function (
        target: Record<string, IController>,
        key: string,
        descriptor: PropertyDescriptor,
      ) {
        const method = descriptor.value;
        const instance = new executer();
        descriptor.value = async function (...args: any) {
            if (await !instance.canExecuteAsync()) throw HttpError.createError(404, 'Not authorized!');
        };
      }
}