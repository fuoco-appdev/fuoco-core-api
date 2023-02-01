// deno-lint-ignore-file no-explicit-any ban-types ban-ts-comment no-unused-vars require-await ban-unused-ignore
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-ignore
import * as Oak from 'https://deno.land/x/oak@v11.1.0/mod.ts';
// @ts-ignore
import {
  // @ts-ignore
  oakCors,
  // @ts-ignore
} from 'https://deno.land/x/cors@v1.2.2/mod.ts';
// @ts-ignore
import { EndpointContext } from './endpoint-context.ts';
// @ts-ignore
import * as HttpError from 'https://deno.land/x/http_errors@3.0.0/mod.ts';

export class Core {
  private static endpointHandler<
    R extends string,
    P extends Oak.RouteParams<R> = Oak.RouteParams<R>,
    S extends Oak.State = Record<string, any>
  >(arg: any, handler: Oak.RouterMiddleware<R, P, S>) {
    return async (
      ctx: Oak.RouterContext<R, P, S>,
      next: () => Promise<unknown>
    ): Promise<unknown> => await handler.call(arg, ctx, next);
  }

  public static registerApp(
    controllers: object[],
    headers: Record<string, string>
  ): Oak.Application {
    const app = new Oak.Application();
    const router = new Oak.Router();
    app.use(oakCors());
    this.registerRouter(router, controllers, headers);

    app.use(router.routes());
    app.use(router.allowedMethods());

    return app;
  }

  /**
   * Register a list of controllers
   */
  private static registerRouter(
    router: Oak.Router<Record<string, any>>,
    controllers: any[],
    headers: Record<string, string>
  ) {
    for (const controller of controllers) {
      if (!controller.path) {
        throw new Error(
          `Controller ${controller} must have a @Controller() decorator!`
        );
      }

      Core.assertEndpoint(controller.path);
      const basePath: string = controller.path;
      const endpoints = controller.endpoints as Record<string, EndpointContext>;
      if (endpoints) {
        for (const id in endpoints) {
          if (!id.startsWith(controller.name)) {
            continue;
          }

          const endpoint = endpoints[id];
          Core.assertEndpoint(endpoint.path);
          const fullPath = basePath + endpoint.path;
          const handler = endpoint.handler as (
            ctx: Oak.RouterContext<
              string,
              Oak.RouteParams<string>,
              Record<string | number, string | undefined>
            >
          ) => Promise<void>;
          const wrapper = Core.endpointHandler(
            controller,
            async (
              ctx: Oak.RouterContext<
                string,
                Oak.RouteParams<string>,
                Record<string | number, string | undefined>
              >
            ) => {
              try {
                if (endpoint.guards) {
                  for (const guard of endpoint.guards) {
                    const canExecute = await guard.canExecuteAsync(ctx);
                    if (!canExecute) {
                      throw HttpError.createError(401, 'Not authorized!');
                    }
                  }
                }

                if (endpoint.contentType) {
                  const canExecute = await endpoint.contentType.canExecuteAsync(
                    ctx
                  );
                  if (!canExecute) {
                    throw HttpError.createError(
                      415,
                      `Invalid content type: ${endpoint.contentType.contextContentType}`
                    );
                  }
                }

                await handler.call(controller, ctx);
                for (const key in headers) {
                  ctx.response.headers.set(key, headers[key]);
                }
              } catch (error: any) {
                ctx.response.body = error;
              }
            }
          );

          router.options(
            fullPath,
            (
              ctx: Oak.RouterContext<
                string,
                Oak.RouteParams<string>,
                Record<string | number, string | undefined>
              >
            ) => {
              ctx.response.body = 'ok';
              for (const key in headers) {
                ctx.response.headers.set(key, headers[key]);
              }
            }
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
