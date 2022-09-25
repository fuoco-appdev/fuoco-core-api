// deno-lint-ignore-file no-explicit-any ban-ts-comment
// @ts-ignore
import { GuardExecuter } from "./guard-executer.ts";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface EndpointContext {
    type: 'delete' | 'get' | 'head' | 'options' | 'patch' | 'post' | 'put';
    path: string;
    key: string;
    handler: any;
    guards: GuardExecuter[];
}