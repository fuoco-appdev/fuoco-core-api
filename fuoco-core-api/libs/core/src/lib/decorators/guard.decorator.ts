/* eslint-disable @typescript-eslint/no-explicit-any */
// deno-lint-ignore-file no-explicit-any no-unused-vars ban-ts-comment ban-unused-ignore
// @ts-ignore
import { GuardExecuter } from "../guard-executer.ts";
// @ts-ignore
import { EndpointContext } from "../endpoint-context.ts";

export function Guard<T extends typeof GuardExecuter>(executer: T) {
    return function (
        target: Record<string, any>,
        key: string,
        descriptor: PropertyDescriptor,
      ) {
        const instance = new executer();
        const prototype = Object.getPrototypeOf(target);
        if (prototype.endpoints) {
          if (prototype.endpoints[key]) {
            prototype.endpoints[key].guards = prototype.endpoints[key].guards ?? [] as GuardExecuter[];
            (prototype.endpoints[key] as EndpointContext).guards.push(instance);
          }
        }
      }
}