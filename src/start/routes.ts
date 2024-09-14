import AuthController from "@/app/controllers/AuthController";
import TenantController from "@/app/controllers/TenantController";
import UserController from "@/app/controllers/UserController";
import { RequestTenant } from "@/app/middlewares/RequestTenant";
import Router from "@/app/services/RouterServices";


Router.prefix('/v1').group(() => {
    Router.post('/tenant', TenantController.store)
})

Router.prefix('/v1/auth').post('/loginSuper', AuthController.loginSuperUser)

Router.prefix('/v1/:tenant/auth').middleware(RequestTenant).post('/login', AuthController.login)

Router
    .prefix('/v1/:tenant')
    .middleware(RequestTenant)
    .group(() => {
        Router.post('/users', UserController.store)
        Router.get('/users', UserController.index)
    })


export default Router.getRouter();