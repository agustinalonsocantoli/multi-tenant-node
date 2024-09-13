import TenantController from "@/app/controllers/TenantController";
import RouterServices from "@/app/services/RouterServices";

const Router = new RouterServices();

Router.group(() => {
    Router.post('/tenant', TenantController.store)
    Router.get('/tenant', TenantController.index)

}).prefix('/v1');

export default Router.getRouter();