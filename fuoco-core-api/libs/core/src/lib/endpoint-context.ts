// deno-lint-ignore-file no-explicit-any ban-ts-comment
// @ts-ignore
import { GuardExecuter, ContentTypeExecuter } from "./executers/index.ts";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface EndpointContext {
    type: 'delete' | 'get' | 'head' | 'options' | 'patch' | 'post' | 'put';
    path: string;
    key: string;
    handler: any;
    guards?: GuardExecuter[];
    contentType?: ContentTypeExecuter;
}