module.exports = app => {
    class NewsController extends app.Controller {
        * find() {
            const ctx = this.ctx;
            const page = ctx.query.page-1 || 0;
            const title = ctx.query.title || "";
            const type = ctx.query.type || 0;
            const list = yield ctx.service.search.find(type,title,page);
            ctx.body=list;


        }
    }
    return NewsController;
};