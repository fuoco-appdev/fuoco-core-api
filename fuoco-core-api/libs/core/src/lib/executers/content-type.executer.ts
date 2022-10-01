// deno-lint-ignore-file ban-ts-comment no-unused-vars ban-unused-ignore
// @ts-ignore
import * as Oak from "https://deno.land/x/oak@v11.1.0/mod.ts";
// @ts-ignore
import { Executer } from "../executer.ts";

export class ContentTypeExecuter extends Executer {
    private readonly _contentType: string;
    private _contextContentType: string;

    constructor(contentType: string) {
        super();
        this._contentType = contentType;
        this._contextContentType = "";
    }

    public get contextContentType(): string {
        return this._contextContentType;
    }

    public async canExecuteAsync(ctx: Oak.RouterContext<
        string,
        Oak.RouteParams<string>,
        Record<string | number, string | undefined>
      >): Promise<boolean> {
        if (ctx.request.headers.has("content-type")) {
            this._contextContentType = ctx.request.headers.get("content-type") ?? "";
            return await this._contextContentType === this._contentType;
        }

        return await false;
    }
}