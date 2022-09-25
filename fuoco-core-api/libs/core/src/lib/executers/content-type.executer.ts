// deno-lint-ignore-file ban-ts-comment no-unused-vars ban-unused-ignore
// @ts-ignore
import * as Oak from "https://deno.land/x/oak@v11.1.0/mod.ts";
// @ts-ignore
import { Executer } from "../executer.ts";

export class ContentTypeExecuter extends Executer {
    private readonly _contentType: string;

    constructor(contentType: string) {
        super();
        this._contentType = contentType;
    }

    public get contentType(): string {
        return this._contentType;
    }

    public canExecute(ctx: Oak.RouterContext<
        string,
        Oak.RouteParams<string>,
        Record<string | number, string | undefined>
      >): boolean {
        if (ctx.request.headers.has("content-type")) {
            return ctx.request.headers.get("content-type") === this._contentType;
        }

        return false;
    }
}