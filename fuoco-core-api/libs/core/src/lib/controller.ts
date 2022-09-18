// deno-lint-ignore-file no-explicit-any
export interface IEndpoint {
    path: string;
    key: string;
    handler: any;
}

export class IController {
    public path?: string;
    public getEndpoints?: IEndpoint[];
    public postEndpoints?: IEndpoint[];
    public deleteEndpoints?: IEndpoint[];
    public putEndpoints?: IEndpoint[];
    public headEndpoints?: IEndpoint[];
    public optionsEndpoints?: IEndpoint[];
    public patchEndpoints?: IEndpoint[];
}