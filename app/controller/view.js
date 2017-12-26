/**
 * 获取文章列表
 */
module.exports = app => {
    class ArticleViewController extends app.Controller {
        async find() {
            const ctx = this.ctx;
            const id = ctx.params.id;
            const data = await ctx.service.view.find(id);
            var title;
            if(data!=null){
                title=data[0].title;
            }else{
                title=""
            }
            const dataList = {
                title:title+"--详情页",
                user:this.ctx.session.user
            }
            dataList.article=data[0];
            await this.ctx.render('view.html', dataList);
        }
    }
    return ArticleViewController;
};
