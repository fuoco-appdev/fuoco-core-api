/* eslint-disable @typescript-eslint/no-explicit-any */
// deno-lint-ignore-file no-explicit-any no-unused-vars ban-ts-comment ban-unused-ignore
// @ts-ignore
import { GuardExecuter } from "../guard-executer.ts";
// @ts-ignore
import * as HttpError from "https://deno.land/x/http_errors@3.0.0/mod.ts";
// @ts-ignore
import * as Oak from "https://deno.land/x/oak@v11.1.0/mod.ts";
// @ts-ignore
import { EndpointContext } from "../endpoint-context.ts";

export function Guard<T extends typeof GuardExecuter>(executer: T) {
    return function (
        target: Record<string, any>,
        key: string,
        descriptor: PropertyDescriptor,
      ) {
        const instance = new executer();
        instance.canExecuteAsync().then((canExecute: boolean) => {
          if (!canExecute) {
            descriptor.value = function(ctx: Oak.RouterContext<
              string,
              Oak.RouteParams<string>,
              Record<string | number, string | undefined>
            >) {
              ctx.response.body = HttpError.createError(401, 'Not authorized!');
            }

            const prototype = Object.getPrototypeOf(target);
            const endpoint  = prototype.endpoints[key] as EndpointContext;
            if (endpoint) {
              endpoint.handler = descriptor.value;
            }
            else {
              throw new Error(`Endpoint with key ${key} does not exist`);
            }
          }
        });
      }
}