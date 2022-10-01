// deno-lint-ignore-file ban-ts-comment no-unused-vars
// @ts-ignore
import * as Oak from "https://deno.land/x/oak@v11.1.0/mod.ts";
// @ts-ignore
import { Executer } from "../executer.ts";

export class GuardExecuter extends Executer {
    public async canExecuteAsync(ctx: Oak.RouterContext<
        string,
        Oak.RouteParams<string>,
        Record<string | number, string | undefined>
      >): Promise<boolean> {
        return await false;
    }
}