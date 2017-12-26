// app/controller/users.js
module.exports = app => {
    class ErrorController extends app.Controller {
        * index() {
            yield this.ctx.render('error.html', { title:"404错误", user:this.ctx.session.user});
        }
    }
    return ErrorController;
};