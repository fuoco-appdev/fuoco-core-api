/* eslint-disable @typescript-eslint/no-restricted-imports, @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { GuardExecuter } from "../guard-executer.ts";
// @ts-ignore
import * as HttpError from "https://deno.land/x/http_errors/mod.ts";

export function Guard<T extends typeof GuardExecuter>(executer: T) {
    return function (
        target: Record<string, any>,
        key: string,
        descriptor: PropertyDescriptor,
      ) {
        const method = descriptor.value;
        const instance = new executer();
        descriptor.value = async function (...args) {
            if (await !instance.canExecuteAsync()) throw new HttpError.Forbidden('Not authorized!');
            
            // This part will run when Meteor.isClient == false
            method.apply(this, args);
        };
      }
}