// deno-lint-ignore-file ban-types ban-ts-comment
// @ts-ignore
import { EndpointContext } from '../endpoint-context.ts';

export function Controller(path: string) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      path: string = path;
      endpoints: Record<string, EndpointContext> = {};
    };
  };
}
