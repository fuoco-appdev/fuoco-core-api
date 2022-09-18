// deno-lint-ignore-file no-explicit-any
export interface IEndpoint {
    path: string;
    key: string;
    handler: any;
}

export class IController {
    path?: string;
    getEndpoints?: IEndpoint[];
    postEndpoints?: IEndpoint[];
    deleteEndpoints?: IEndpoint[];
    putEndpoints?: IEndpoint[];
    headEndpoints?: IEndpoint[];
    optionsEndpoints?: IEndpoint[];
    patchEndpoints?: IEndpoint[];
}