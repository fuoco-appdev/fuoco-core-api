/* eslint-disable @typescript-eslint/no-explicit-any */
// deno-lint-ignore-file no-explicit-any no-unused-vars ban-ts-comment ban-unused-ignore
// @ts-ignore
import { ContentTypeExecuter } from "../executers/index.ts";
// @ts-ignore
import { EndpointContext } from "../endpoint-context.ts";

export function ContentType(contentType: string) {
    return function (
        target: Record<string, any>,
        key: string,
        descriptor: PropertyDescriptor,
      ) {
        const instance = new ContentTypeExecuter(contentType);
        const prototype = Object.getPrototypeOf(target);
        prototype.endpoints = prototype.endpoints ?? {} as Record<string, EndpointContext>;
        prototype.endpoints[key] = prototype.endpoints[key] ?? {};
        prototype.endpoints[key].contentType = instance;
      }
}