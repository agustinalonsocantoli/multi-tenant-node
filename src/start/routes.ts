import AccountController from "@/app/controllers/AccountController";
import AuthController from "@/app/controllers/AuthController";
import TenantController from "@/app/controllers/TenantController";
import UserController from "@/app/controllers/UserController";
import { Auth } from "@/app/middlewares/Auth";
import { RequestTenant } from "@/app/middlewares/RequestTenant";
import { SuperUserProtect } from "@/app/middlewares/SuperUserProtect";
import { ValidateRol } from "@/app/middlewares/ValidateRol";
import Router from "@/app/services/RouterServices";

Router.prefix('/v1/auth').post('/loginSuper', AuthController.loginSuperUser)
Router.prefix('/v1/:tenant/auth').middleware(RequestTenant).post('/login', AuthController.login)

Router
    .prefix('/v1')
    .middleware(Auth, SuperUserProtect)
    .group(() => {
        Router.post('/tenant', TenantController.store)
        Router.get('/tenant', TenantController.index)
    })

Router
    .prefix('/v1/:tenant')
    .middleware(RequestTenant, Auth)
    .group(() => {
        Router.get('/accounts', AccountController.index)
        Router.get('/accounts', AccountController.show)
        Router.post('/accounts', AccountController.store)
        Router.put('/accounts', AccountController.update)
        Router.delete('/accounts', AccountController.destroy)
    })

Router
    .prefix('/v1/:tenant')
    .middleware(RequestTenant, Auth, ValidateRol)
    .group(() => {
        Router.post('/users', UserController.store)
        Router.get('/users', UserController.index)
    })


export default Router.getRouter();