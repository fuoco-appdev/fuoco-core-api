// deno-lint-ignore-file ban-ts-comment no-unused-vars ban-unused-ignore
// @ts-ignore
import * as Oak from "https://deno.land/x/oak@v11.1.0/mod.ts";

export abstract class Executer {
    public abstract canExecute(ctx: Oak.RouterContext<
        string,
        Oak.RouteParams<string>,
        Record<string | number, string | undefined>
      >): boolean;
}