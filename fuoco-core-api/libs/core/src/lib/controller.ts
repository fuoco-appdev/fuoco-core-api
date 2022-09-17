// deno-lint-ignore-file no-explicit-any
export interface IController {
    path?: any;
    getEndpoints?: any;
    postEndpoints?: any;
    deleteEndpoints?: any;
    putEndpoints?: any;
    headEndpoints?: any;
    optionsEndpoints?: any;
    patchEndpoints?: any;
    [key: string]: any;
}