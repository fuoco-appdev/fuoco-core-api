// deno-lint-ignore-file no-explicit-any ban-types ban-ts-comment no-unused-vars require-await ban-unused-ignore
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-ignore
import { ConnInfo, Handler } from "https://deno.land/std@0.131.0/http/server.ts";
// @ts-ignore
import { createError } from "https://deno.land/x/http_errors@3.0.0/mod.ts";
// @ts-ignore
import * as Oak from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { IController } from "./controller.ts";
// @ts-ignore
import { EndpointContext } from "./endpoint-context.ts";
  
  export class Core {
    private static endpointHandler<
      R extends string,
      P extends Oak.RouteParams<R> = Oak.RouteParams<R>,
      S extends Oak.State = Record<string, any>,
    >(arg: any, handler: Oak.RouterMiddleware<R, P, S>) {
        return async (
            ctx: Oak.RouterContext<R, P, S>,
            next: () => Promise<unknown>,
          ): Promise<unknown> => await handler.call(arg, ctx, next);
    }

    public static registerHandler(controllers: object[], remote: boolean): Handler {
        const app = new Oak.Application();
        const router = new Oak.Router();
        this.registerRouter(router, controllers);
        app.use(router.routes());
        app.use(router.allowedMethods());
        // @ts-ignore
        const handler = async (request: Request, conn: ConnInfo) => await app.handle(request, conn as Deno.Conn);
        return handler as Handler;
      }
  
    /**
     * Register a list of controllers
     */
    private static registerRouter(
      router: Oak.Router<Record<string, any>>,
      controllers: IController[],
    ) {
      for (const controller of controllers) {
        if (!controller.path) {
            throw new Error(`Controller ${controller.constructor.name} must have a @Controller() decorator!`);
        }

        Core.assertEndpoint(controller.path);
        const basePath: string = controller.path;
        const getEndpoints = controller.getEndpoints;
        const postEndpoints = controller.postEndpoints;
        const deleteEndpoints = controller.deleteEndpoints;
        const putEndpoints = controller.putEndpoints;
        const headEndpoints = controller.headEndpoints;
        const optionsEndpoints = controller.optionsEndpoints;
        const patchEndpoints = controller.patchEndpoints;
        if (getEndpoints) {
            Core.addGetEndpoints(basePath, router, controller, getEndpoints);
        }
        if (postEndpoints) {
            Core.addPostEndpoints(basePath, router, controller, postEndpoints);
        }
        if (deleteEndpoints) {
            Core.addDeleteEndpoints(basePath, router, controller, deleteEndpoints);
        }
        if (putEndpoints) {
            Core.addPutEndpoints(basePath, router, controller, putEndpoints);
        }
        if (headEndpoints) {
            Core.addHeadEndpoints(basePath, router, controller, headEndpoints);
        }
        if (optionsEndpoints) {
            Core.addOptionsEndpoints(basePath, router, controller, optionsEndpoints);
        }
        if (patchEndpoints) {
            Core.addPatchEndpoints(basePath, router, controller, patchEndpoints);
        }
      }
    }

    private static addGetEndpoints(
        basePath: string,
        router: Oak.Router<Record<string, any>>,
        controller: object,
        endpoints: EndpointContext[]) {
        for (const endpoint of endpoints) {
            Core.assertEndpoint(endpoint.path);
            const fullPath = basePath + endpoint.path;
            const handler = endpoint.handler as ((params: Oak.RouteParams<string>, ctx: Oak.RouterContext<
                string,
                Oak.RouteParams<string>,
                Record<string | number, string | undefined>
              >) => void);
            const wrapper = Core.endpointHandler(
              controller,
              (ctx) => handler.call(controller, ctx.params, ctx),
            );
            router.get(fullPath, wrapper);
        }
    }

    private static addPostEndpoints(
        basePath: string,
        router: Oak.Router<Record<string, any>>,
        controller: object,
        endpoints: EndpointContext[]) {
        for (const endpoint of endpoints) {
            Core.assertEndpoint(endpoint.path);
            const fullPath = basePath + endpoint.path;
            const handler = endpoint.handler as ((params: Oak.RouteParams<string>, ctx: Oak.RouterContext<
                string,
                Oak.RouteParams<string>,
                Record<string | number, string | undefined>
              >) => void);
            const wrapper = Core.endpointHandler(
              controller,
              (ctx) => handler.call(controller, ctx.params, ctx),
            );
            router.post(fullPath, wrapper);
        }
    }

    private static addDeleteEndpoints(
        basePath: string,
        router: Oak.Router<Record<string, any>>,
        controller: object,
        endpoints: EndpointContext[]) {
        for (const endpoint of endpoints) {
            Core.assertEndpoint(endpoint.path);
            const fullPath = basePath + endpoint.path;
            const handler = endpoint.handler as ((params: Oak.RouteParams<string>, ctx: Oak.RouterContext<
                string,
                Oak.RouteParams<string>,
                Record<string | number, string | undefined>
              >) => void);
            const wrapper = Core.endpointHandler(
              controller,
              (ctx) => handler.call(controller, ctx.params, ctx),
            );
            router.delete(fullPath, wrapper);
        }
    }

    private static addPutEndpoints(
        basePath: string,
        router: Oak.Router<Record<string, any>>,
        controller: object,
        endpoints: EndpointContext[]) {
        for (const endpoint of endpoints) {
            Core.assertEndpoint(endpoint.path);
            const fullPath = basePath + endpoint.path;
            const handler = endpoint.handler as ((params: Oak.RouteParams<string>, ctx: Oak.RouterContext<
                string,
                Oak.RouteParams<string>,
                Record<string | number, string | undefined>
              >) => void);
            const wrapper = Core.endpointHandler(
              controller,
              (ctx) => handler.call(controller, ctx.params, ctx),
            );
            router.put(fullPath, wrapper);
        }
    }

    private static addHeadEndpoints(
        basePath: string,
        router: Oak.Router<Record<string, any>>,
        controller: object,
        endpoints: EndpointContext[]) {
        for (const endpoint of endpoints) {
            Core.assertEndpoint(endpoint.path);
            const fullPath = basePath + endpoint.path;
            const handler = endpoint.handler as ((params: Oak.RouteParams<string>, ctx: Oak.RouterContext<
                string,
                Oak.RouteParams<string>,
                Record<string | number, string | undefined>
              >) => void);
            const wrapper = Core.endpointHandler(
              controller,
              (ctx) => handler.call(controller, ctx.params, ctx),
            );
            router.head(fullPath, wrapper);
        }
    }

    private static addOptionsEndpoints(
        basePath: string,
        router: Oak.Router<Record<string, any>>,
        controller: object,
        endpoints: EndpointContext[]) {
        for (const endpoint of endpoints) {
            Core.assertEndpoint(endpoint.path);
            const fullPath = basePath + endpoint.path;
            const handler = endpoint.handler as ((params: Oak.RouteParams<string>, ctx: Oak.RouterContext<
                string,
                Oak.RouteParams<string>,
                Record<string | number, string | undefined>
              >) => void);
            const wrapper = Core.endpointHandler(
              controller,
              (ctx) => handler.call(controller, ctx.params, ctx),
            );
            router.options(fullPath, wrapper);
        }
    }

    private static addPatchEndpoints(
        basePath: string,
        router: Oak.Router<Record<string, any>>,
        controller: object,
        endpoints: EndpointContext[]) {
        for (const endpoint of endpoints) {
            Core.assertEndpoint(endpoint.path);
            const fullPath = basePath + endpoint.path;
            const handler = endpoint.handler as ((params: Oak.RouteParams<string>, ctx: Oak.RouterContext<
                string,
                Oak.RouteParams<string>,
                Record<string | number, string | undefined>
              >) => void);
            const wrapper = Core.endpointHandler(
              controller,
              (ctx) => handler.call(controller, ctx.params, ctx),
            );
            router.patch(fullPath, wrapper);
        }
    }

    private static assertEndpoint(path: string | undefined): void {
      if (!path?.startsWith('/')) {
        throw createError(404, `${path} must start with a '/'`);
      }
    }
  }