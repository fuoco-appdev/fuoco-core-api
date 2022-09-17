// deno-lint-ignore-file no-explicit-any
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface EndpointContext {
    path: string;
    key: string;
    handler: any;
}