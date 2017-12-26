var sha1 = require('sha1');
var svgCaptcha = require('svg-captcha');//验证码插件
module.exports = app => {
    class adminController extends app.Controller {
        async captcha(){
           var captcha = svgCaptcha.create({
               width:138,
               height:38,
               background: '#FFB800'
           });
            const nowTime=new Date();
            var maxDate=nowTime.getTime()+1000*60;//时效一分钟
            this.ctx.session.admYzmText=captcha.text.toLowerCase();
            this.ctx.session.admYzmMax=maxDate;
            this.ctx.body=captcha.data;
        }
        async home(){
            await this.ctx.render('admin/index.html', {title:'文章管理后台',admin:this.ctx.session.admin});
        }
        async main(){
            await this.ctx.render('admin/main.html', {title:'文章管理后台'});
        }
        async userList(){
            await this.ctx.render('admin/user.html', {title:'用户管理'});
        }
        async getUser(){
           const {name,tel,page}=this.ctx.query;
           var wh={};
            if(name!=""&&tel==""){wh={cname:name}}
            if(tel!=""&&name==""){wh={tel:tel}}
            if(tel!=""&&name!=""){wh={cname:name,tel:tel}}
            const users=await this.ctx.service.admin.userList(wh,page-1);
            if(users){
                users.forEach(function (item,index) {
                    item.sex=item.sex==1?"男":"女";
                })
            }
            this.ctx.body=users;
        }
        async sign(){
            await this.ctx.render('admin/login.html', {title:'后台登录'});
        }
        async signout(  ){
            this.ctx.session.admin = null;
            this.ctx.redirect("/admin/sign")
        }
        async articleCheck(){
            const ctx=this.ctx;
            const id=ctx.request.body.id-0;
            const val=ctx.request.body.val-0;
            if(ctx.session.admin==null){
                ctx.body={status:0,msg:"请登录"}
                return ;
            }
            if(ctx.session.admin.level!=6){
                ctx.body={status:0,msg:"权限不够"}
                return ;
            }
            const data = await ctx.service.admin.articleCheck(val,id);
            if(data.affectedRows === 1){
                ctx.body={status:1,msg:"审核成功"}
            }else{
                ctx.body={status:0,msg:"审核失败"}
            }

        }
        async view(){
            const ctx = this.ctx;
            const id = ctx.params.id;
            const data = await ctx.service.admin.find(id);
            var title;
            if(data!=null){
                title=data[0].title;
            }else{
                title=""
            }
            const dataList = {
                title:title+"--详情页",
                user:this.ctx.session.admin
            }
            dataList.article=data[0];
            await this.ctx.render('admin/view.html', dataList);

        }
        async publishGet(){
            await this.ctx.render('admin/publish.html',{title:"文章发布", type:this.app.config.type,user:this.ctx.session.admin});

        }
        async publishPost(){
            const ctx=this.ctx;
            const {title,summary,price,type,cover,content}=ctx.request.body;
            const time=ctx.helper.getNowTime();
            if(!ctx.session.admin){
                ctx.body={status:0,msg:"请登录"}
                return ;
            }
            const data = await ctx.service.admin.articleInsert({title:title,summary:summary,time:time,price:price,content:content,type:type,cover:cover,uid:ctx.session.admin.id});
            if(data.affectedRows === 1){
                ctx.body={status:1,msg:"发布成功",articleId:data.insertId}
            }else{
                ctx.body={status:0,msg:"发布失败"}
            }

        }

        async postSign() {
            const ctx=this.ctx;
            const {cname,psw,yzm,rememberMe}=ctx.request.body;
            //验证码判断
            var curTime=new Date();
            if(ctx.session.admYzmMax-curTime.getTime()>0){
                 if(ctx.session.admYzmText!=yzm){
                     ctx.body={status:0,msg:"验证码错误"}
                     return ;
                 }
            }else{
                ctx.body={status:0,msg:"验证码失效"}
                return ;
            }
            //先查找
            const user = await ctx.service.admin.adminFind({cname:cname});

            var psw2=sha1(psw) //加密
            if(user!=null){
                if(user.psw!=psw2){
                    ctx.body={status:0,msg:"密码有误！"}
                    return ;
                }
                if(user.level!=6){
                    ctx.body={status:0,msg:"权限不够！"}
                    return ;
                }
                // 如果用户勾选了 `记住我`，设置 1 天的过期时间,不勾选默认一个小时
                if (rememberMe==="on") {
                    ctx.session.admin = user;
                    ctx.session.maxAge =1*24*60*60*1000;
                }else{
                    ctx.session.admin = user;
                    ctx.session.maxAge =1*60*60*1000;
                }
                ctx.rotateCsrfSecret();
                ctx.body={status:1,msg:"登录成功",url:'/admin'}

            }else{
                ctx.body={status:0,msg:"用户名不存在！"}
            }
        }
        async articleList(){
            const ctx = this.ctx;
            const page = ctx.query.page-1 || 0;
            const title = ctx.query.title || "";
            const start = ctx.query.start || "";
            const end = ctx.query.end || "";
            const type = ctx.query.type-0 || 0;
            const list = await ctx.service.admin.articleList(type,start,end,title,page);
            list.article.forEach(function (item,index) {
                item.passed=  item.passed==1?"已通过":"未通过"
            })
            ctx.body=list;
        }
        async articleedit() {
            const ctx = this.ctx;
            const id = ctx.params.id;
            if (ctx.session.admin.level!=6) {
                ctx.body = {status: 0, msg: "权限不足"}
                return;
            }
            const data = await ctx.service.admin.articleFind(id);
            var title;
            if (data != null) {
                title = data[0].title;
            } else {
                title = "";
                ctx.body = {status: 0, msg: "无更多数据"}
                return;
            }
            await this.ctx.render('admin/articleedit.html', {
                title: title + "--文章修改",
                user: this.ctx.session.admin,
                article: data[0],
                type: this.app.config.type
            });
        }
        async articleupdate(){
            const ctx = this.ctx;
            const id = ctx.params.id;
            const parmar = ctx.request.body;
            parmar.aid = id;
            if (ctx.session.admin.level!=6 ) {
                ctx.body = {status: 0, msg: "权限不够"}
                return;
            }
            const data = await ctx.service.admin.updatearticle(parmar);
            if (data.affectedRows == 1) {
                this.ctx.body = {status: 1, msg: "更新成功", id: id}
            } else {
                this.ctx.body = {status: 0, msg: "更新失败"}
            }
        }
    }
    return adminController;
}