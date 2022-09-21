// deno-lint-ignore-file no-explicit-any
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface EndpointContext {
    type: 'delete' | 'get' | 'head' | 'options' | 'patch' | 'post' | 'put';
    path: string;
    key: string;
    handler: any;
}