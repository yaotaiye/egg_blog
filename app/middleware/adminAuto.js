/**
 * 管理员登录中间件
 */

module.exports = (options, app) => {
    return async function (ctx, next) {
        await next();
        if(ctx.path=='/admin/sign'){
            if(!ctx.session.admin){
                return ;
            }else{
                ctx.redirect('/admin');
            }
        }else {
            if(!ctx.session.admin){
                ctx.redirect('/admin/sign');
            }
        }


    };
};
