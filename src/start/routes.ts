import RouterServices from "@/app/services/RouterServices";

const Router = new RouterServices();

Router.group(() => {
    Router.get('/1', async (req, res) => {
        res.ok({ data: '1' });
    })

    Router.get('/2', async (req, res) => {
        res.ok("2");
    })

    Router.get('/3', async (req, res) => {
        res.unauthorized("3");
    })

    Router.get('/4', async (req, res) => {
        res.badRequest("4");
    })

    Router.get('/5', async (req, res) => {
        res.notFound("5");
    })

    Router.get('/6', async (req, res) => {
        res.internalServerError();
    })
}).prefix('/api');

export default Router.getRouter();