import { Router, Request, Response, NextFunction } from 'express';

type MiddlewareFunction = (req: Request, res: Response, next: NextFunction) => void;

type RouteDefinition = {
    method: 'get' | 'post' | 'put' | 'delete';
    path: string;
    controller: (req: Request, res: Response) => Promise<void>;
}

export default class RouterServices {
    private router = Router();
    private prefixPath = '';
    private middlewares: MiddlewareFunction[] = [];
    private routes: RouteDefinition[] = [];

    middleware(middleware: MiddlewareFunction | MiddlewareFunction[]) {
        if (Array.isArray(middleware)) {
            this.middlewares.push(...middleware);
        } else {
            this.middlewares.push(middleware);
        }

        return this;
    }

    group(callback: () => void) {
        callback();

        return this;
    }

    prefix(prefix: string) {
        this.prefixPath = prefix;

        this.routes.forEach(route => {
            const fullPath = `${this.prefixPath}${route.path}`;
            this.router[route.method](fullPath, ...this.middlewares, route.controller);
        });

        this.routes = [];
        return this;
    }

    private addRoute(method: 'get' | 'post' | 'put' | 'delete', path: string, controller: (req: Request, res: Response) => Promise<void>) {
        this.routes.push({ method, path, controller });
        return this;
    }

    get(path: string, controller: (req: Request, res: Response) => Promise<void>) {
        return this.addRoute('get', path, controller);
    }

    post(path: string, controller: (req: Request, res: Response) => Promise<void>) {
        return this.addRoute('post', path, controller);
    }

    put(path: string, controller: (req: Request, res: Response) => Promise<void>) {
        return this.addRoute('put', path, controller);
    }

    delete(path: string, controller: (req: Request, res: Response) => Promise<void>) {
        return this.addRoute('delete', path, controller);
    }

    getRouter() {
        return this.router;
    }
}