// deno-lint-ignore-file no-explicit-any ban-types
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HandleMethod } from "https://deno.land/x/oak@v11.1.0/application.ts";
import * as Oak from "https://deno.land/x/oak@v11.1.0/mod.ts";
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

    public static registerHandler(controllers: object[]): HandleMethod {
        const app = new Oak.Application();
        const router = new Oak.Router();
        this.registerRouter(router, controllers);
        app.use(router.routes());
        app.use(router.allowedMethods());
        return app.handle;
      }
  
    /**
     * Register a list of controllers
     */
    private static registerRouter(
      router: Oak.Router<Record<string, any>>,
      controllers: object[],
    ) {
      for (const controller of controllers) {
        if (!controller.constructor.prototype.path) {
            throw new Error(`Controller ${controller.constructor.name} must have a @Controller() decorator!`);
        }

        const basePath: string = controller.constructor.prototype.path;
        const getEndpoints = controller.constructor.prototype.getEndpoints;
        const postEndpoints = controller.constructor.prototype.postEndpoints;
        const deleteEndpoints = controller.constructor.prototype.deleteEndpoints;
        const putEndpoints = controller.constructor.prototype.putEndpoints;
        const headEndpoints = controller.constructor.prototype.headEndpoints;
        const optionsEndpoints = controller.constructor.prototype.optionsEndpoints;
        const patchEndpoints = controller.constructor.prototype.patchEndpoints;
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
            Core.addGetEndpoints(basePath, router, controller, patchEndpoints);
        }
      }
    }

    private static addGetEndpoints(
        basePath: string,
        router: Oak.Router<Record<string, any>>,
        controller: object,
        endpoints: EndpointContext[]) {
        for (const endpoint of endpoints) {
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
  }