/* eslint-disable @typescript-eslint/no-explicit-any */
// deno-lint-ignore-file no-explicit-any no-unused-vars ban-ts-comment ban-unused-ignore
// @ts-ignore
import { GuardExecuter } from '../executers/index.ts';
// @ts-ignore
import { EndpointContext } from '../endpoint-context.ts';

export function Guard<T extends typeof GuardExecuter>(executer: T) {
  return function (
    target: Record<string, any>,
    key: string,
    descriptor?: PropertyDescriptor
  ) {
    const id = `${target.constructor.name}-${key}`;
    const instance = new executer();
    !target.endpoints &&
      Object.defineProperty(target, 'endpoints', {
        value: {} as Record<string, EndpointContext>,
      });
    target.endpoints[id] = target.endpoints[id] ?? {};
    target.endpoints[id].guards = target.endpoints[id].guards ?? [];
    target.endpoints[id].guards.push(instance);
  };
}
