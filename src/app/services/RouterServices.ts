import e, { Router as RouterServices, Request, Response, NextFunction } from 'express';

type MiddlewareFunction = (req: Request, res: Response, next: NextFunction) => void;

class Router {
    private router = RouterServices();
    private currentPrefix: string = '';
    private currentMiddlewares: MiddlewareFunction[] = [];

    middleware(...middlewares: MiddlewareFunction[]) {
        this.currentMiddlewares = middlewares;
        return this;
    }

    prefix(prefix: string) {
        this.currentPrefix = prefix;
        return this;
    }

    group(callback: () => void) {
        const previousPrefix = this.currentPrefix;
        const previousMiddlewares = this.currentMiddlewares;

        callback();

        this.currentPrefix = previousPrefix;
        this.currentMiddlewares = previousMiddlewares;

        return this;
    }

    // Métodos HTTP para definir rutas
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

    private addRoute(method: 'get' | 'post' | 'put' | 'delete', path: string, controller: (req: Request, res: Response) => Promise<void>) {
        const fullPath = this.currentPrefix ? `${this.currentPrefix}${path}` : path;
        const middlewares = [...this.currentMiddlewares];

        this.router[method](fullPath, ...middlewares, controller);
        return this;
    }

    getRouter() {
        return this.router;
    }
}

export default new Router();