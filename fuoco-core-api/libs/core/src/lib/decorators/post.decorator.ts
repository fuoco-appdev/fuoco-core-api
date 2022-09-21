// deno-lint-ignore-file no-explicit-any no-unused-vars require-await ban-unused-ignore ban-ts-comment
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-ignore
import * as Oak from "https://deno.land/x/oak@v11.1.0/mod.ts";
// @ts-ignore
import * as HttpError from "https://deno.land/x/http_errors@3.0.0/mod.ts";
// @ts-ignore
import { GuardExecuter } from "../guard-executer.ts";

export function Post(path: string) {
    return function (
      target: Record<string, any>,
      key: string,
      descriptor: PropertyDescriptor,
    ) {
      const prototype = Object.getPrototypeOf(target);
      prototype.postEndpoints = prototype.postEndpoints ?? [];
      prototype.postEndpoints.push({
          path,
          key,
          handler: descriptor.value,
      });
    };
  }