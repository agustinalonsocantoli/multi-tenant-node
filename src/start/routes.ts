import RouterServices from "@/app/services/RouterServices";

const Router = new RouterServices();

Router.group(() => {
    Router.get('/1', async (req, res) => {
        res.ok({ data: '1' });
    })

}).prefix('/api');

export default Router.getRouter();