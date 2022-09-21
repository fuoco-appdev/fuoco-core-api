/* eslint-disable @typescript-eslint/no-explicit-any */
// deno-lint-ignore-file no-explicit-any no-unused-vars ban-ts-comment
// @ts-ignore
import { GuardExecuter } from "../guard-executer.ts";
// @ts-ignore
import * as HttpError from "https://deno.land/x/http_errors@3.0.0/mod.ts";
// @ts-ignore
import * as Oak from "https://deno.land/x/oak@v11.1.0/mod.ts";

export function Guard<T extends typeof GuardExecuter>(executer: T) {
    return async function (
        target: Record<string, any>,
        key: string,
        descriptor: PropertyDescriptor,
      ) {
        const instance = new executer();
        const canExecute = await instance.canExecuteAsync();
        if (!canExecute) {
          descriptor.value = function(ctx: Oak.RouterContext<
            string,
            Oak.RouteParams<string>,
            Record<string | number, string | undefined>
          >) {
            ctx.response.body = HttpError.createError(401, 'Not authorized!');
          }
        }
      }
}