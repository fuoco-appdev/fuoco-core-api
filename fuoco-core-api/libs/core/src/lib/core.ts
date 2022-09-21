// deno-lint-ignore-file no-explicit-any ban-types ban-ts-comment no-unused-vars require-await ban-unused-ignore
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-ignore
import * as Oak from "https://deno.land/x/oak@v11.1.0/mod.ts";
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

    public static registerApp(controllers: object[]): Oak.Application {
        const app = new Oak.Application();
        const router = new Oak.Router();
        this.registerRouter(router, controllers);
        app.use(router.routes());
        app.use(router.allowedMethods());
        return app;
      }
  
    /**
     * Register a list of controllers
     */
    private static registerRouter(
      router: Oak.Router<Record<string, any>>,
      controllers: object[],
    ) {
      for (const controller of controllers) {
        const prototype = Object.getPrototypeOf(controller);
        if (!prototype.path) {
            throw new Error(`Controller ${controller.constructor.name} must have a @Controller() decorator!`);
        }

        Core.assertEndpoint(prototype.path);
        const basePath: string = prototype.path;
        const endpoints = prototype.endpoints as Record<string, EndpointContext>;
        if (endpoints) {
            for (const key in endpoints) {
              const endpoint = endpoints[key];
              Core.assertEndpoint(endpoint.path);
              const fullPath = basePath + endpoint.path;
              const handler = endpoint.handler as ((ctx: Oak.RouterContext<
                  string,
                  Oak.RouteParams<string>,
                  Record<string | number, string | undefined>
                >) => void);
              const wrapper = Core.endpointHandler(
                controller,
                (ctx: any) => {
                  try {
                    handler.call(controller, ctx);
                  }
                  catch(error: any) {
                    ctx.response.body = error;
                  }
                },
              );

              switch (endpoint.type) {
                case 'delete':
                  router.delete(fullPath, wrapper);
                  break;
                case 'get':
                  router.get(fullPath, wrapper);
                  break;
                case 'head':
                  router.head(fullPath, wrapper);
                  break;
                case 'options':
                  router.options(fullPath, wrapper);
                  break;
                case 'patch':
                  router.patch(fullPath, wrapper);
                  break;
                case 'post':
                  router.post(fullPath, wrapper);
                  break;
                case 'put':
                  router.put(fullPath, wrapper);
                  break;
              }
          }
        }
      }
    }

    private static assertEndpoint(path: string | undefined): void {
      if (path && !path?.startsWith('/')) {
        throw new Error(`${path} must start with a '/'`);
      }
    }
  }