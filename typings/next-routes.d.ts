import { IncomingMessage, ServerResponse } from "http";
import { Server } from "next";
import { ComponentType } from "react";
import { LinkState } from "next/link";
import { SingletonRouter, EventChangeOptions } from "next/router";

declare function makeRoutes(
  options?: makeRoutes.RouteOptions
): makeRoutes.Routes;

export = makeRoutes;

declare namespace makeRoutes {
  export type HTTPHandler = (
    request: IncomingMessage,
    response: ServerResponse
  ) => void;

  export type RouteParams = {
    [k: string]: string | number;
  };

  export interface LinkProps extends LinkState {
    route: string;
    params?: RouteParams;
  }

  export interface Router extends SingletonRouter {
    pushRoute(
      route: string,
      params?: RouteParams,
      options?: EventChangeOptions
    ): Promise<boolean>;
    replaceRoute(
      route: string,
      params?: RouteParams,
      options?: EventChangeOptions
    ): Promise<boolean>;
    prefetchRoute(
      route: string,
      params?: RouteParams
    ): Promise<React.ComponentType<any>>;
  }

  export interface Registry {
    getRequestHandler(app: Server, custom?: HTTPHandler): HTTPHandler;
    add(name: string, pattern?: string, page?: string): this;
    add(pattern: string, page: string): this;
    add(options: { name: string; pattern?: string; page?: string }): this;
    Link: ComponentType<LinkProps>;
    Router: Router;
  }

  export interface RouteOptions {
    Link?: ComponentType<LinkProps>;
    Router?: Router;
  }

  export class Routes implements Registry {
    constructor(options?: RouteOptions);
    getRequestHandler(app: Server, custom?: HTTPHandler): HTTPHandler;
    add(name: string, pattern?: string, page?: string): this;
    add(pattern: string, page: string): this;
    add(options: { name: string; pattern?: string; page?: string }): this;
    Link: ComponentType<LinkProps>;
    Router: Router;
  }
}
