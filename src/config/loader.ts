import morgan from "morgan";
import { json, urlencoded, Express } from "express";
import cors from "cors";
import helmet from "helmet";
import router from "../start/routes";
import { responseEnhancer } from "@/app/middlewares/ResponseEnhacer";

export default async function expressLoader(app: Express) {
    if(!app) throw new Error("Express instance not exists");
    
    app.use(responseEnhancer);
    app.use(morgan("dev"));
    app.use(json());
    app.use(urlencoded({ extended: false }));
    app.use(cors({ origin: "*" }));
    app.use(helmet());

    app.use((req, res, next) => {
        if (req.url === '/favicon.ico') {
            res.status(204).end();
        } else {
            next();
        }
    });

    app.use(router);
}