'use strict';

// app/controller/home.js
module.exports = app => {
    class HomeController extends app.Controller {
        * index() {
            const dataList = {
                title:'首页',
                article:[],
                type:this.app.config.type,
                user:this.ctx.session.user,

            };
         //  console.log(dataList)
            yield this.ctx.render('index.html', dataList);
        }
    }
    return HomeController;
};
