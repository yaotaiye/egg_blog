// app/controller/users.js
var sha1 = require('sha1');
var uuid = require('node-uuid'); //生成唯一字符串
const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');

module.exports = app => {
    class UsersController extends app.Controller {
        async signup() {
            const data = {
                title: "用户注册", user: this.ctx.session.user
            }
            await this.ctx.render('signup.html', data);
        }

        async sign() {
            const data = {
                title: "用户登录", user: this.ctx.session.user
            }
            await this.ctx.render('sign.html', data);
        }

        async insert() {
            const ctx = this.ctx;
            //ctx.rotateCsrfSecret();
            //先查找
            const {name, cname, psw, tel, sex, adr, avatar}=ctx.request.body;
            const user = await ctx.service.users.find({cname: cname});
            if (user != null) {
                if (user.cname === cname) {
                    ctx.body = {status: 1, msg: ctx.request.body.cname + " 用户名已存在!"}
                    return;
                }
            }
            //后插入
            var psw2 = sha1(psw); //加密
            const time = ctx.helper.getNowTime();
            const data = await ctx.service.users.insert({
                name: name,
                cname: cname,
                psw: psw2,
                tel: tel,
                sex: sex,
                adr: adr,
                avatar: avatar,
                time: time
            });
            if (data.affectedRows === 1) {
                ctx.body = {status: 1, msg: "注册成功"}
            } else {
                ctx.body = {status: 0, msg: "注册失败"}
            }

        }

        async signout() {
            this.ctx.session.user = null;
            this.ctx.redirect("/")
        }

        async login() {
            const ctx = this.ctx;
            const {cname, psw, rememberMe}=ctx.request.body;
            //判断是否存在session
            if (ctx.session != null && ctx.session.user != null) {
                ctx.body = {status: 1, msg: "登录成功"}
                return;
            }
            //先查找
            const user = await ctx.service.users.find({cname: ctx.request.body.cname});
            var psw2 = sha1(ctx.request.body.psw) //加密
            if (user != null) {
                if (user.psw != psw2) {
                    ctx.body = {status: 0, msg: "密码有误！"}
                    return;
                }
                // 如果用户勾选了 `记住我`，设置 1天的过期时间,不勾选默认一小时
                if (rememberMe === "on") {
                    ctx.session.user = user;
                    ctx.session.maxAge = 1* 60 * 60 * 1000;
                } else {
                    ctx.session.user = user;
                    ctx.session.maxAge = 60  * 60 * 1000;
                }
                ctx.body = {status: 1, msg: "登录成功"}
            } else {
                ctx.body = {status: 0, msg: "用户名不存在！"}
            }
        }

        async upload() { //图片上传
            const stream = await this.ctx.getFileStream();
            const name = uuid.v1(stream.filename.replace(/.(png|jpg|gif|bmp)$/, ""));
            const filename = encodeURIComponent(name) + path.extname(stream.filename).toLowerCase();
            const target = path.join(this.config.baseDir, 'app/public/upload/', filename);
            const writeStream = fs.createWriteStream(target);
            try {
                await awaitWriteStream(stream.pipe(writeStream));
                this.ctx.body = {
                    "code": 1
                    , "msg": "上传成功"
                    , "data": {
                        "src": filename
                    }
                }
            } catch (err) {
                await sendToWormhole(stream);
                throw err;
            }
        }

        async publishGet() {
            await this.ctx.render('publish.html', {
                title: "文章发布",
                type: this.app.config.type,
                user: this.ctx.session.user
            });

        }

        async publishPost() {
            const ctx = this.ctx;
            if (!ctx.session.user) {
                ctx.body = {status: 0, msg: "请登录"}
                return;
            }
            const {title, summary, price, type, cover, content}=ctx.request.body;
            const time = ctx.helper.getNowTime();
            const data = await ctx.service.users.articleInsert({
                title: title,
                summary: summary,
                time: time,
                price: price,
                content: content,
                type: type,
                cover: cover,
                uid: ctx.session.user.id
            });
            if (data.affectedRows === 1) {
                ctx.body = {status: 1, msg: "发布成功", articleId: data.insertId}
            } else {
                ctx.body = {status: 0, msg: "发布失败"}
            }

        }

        async center() {
            await this.ctx.render('center.html', {title: "个人中心", user: this.ctx.session.user});
        }

        async mypublish() {
            const ctx = this.ctx;
            const userId = ctx.session.user.id;
            const page = ctx.query.page || 0;
            const data = await ctx.service.users.articleFind({uid: userId}, page);
            if (data != null) {
                ctx.body = {status: 1, msg: "获取成功", data: data}
            } else {
                ctx.body = {status: 1, msg: "无数据"}
            }
        }

        async useredit() {
            await this.ctx.render('useredit.html', {title: "个人信息修改", user: this.ctx.session.user});
        }

        async updateuser() {
            const user = this.ctx.request.body;
            user.id = this.ctx.session.user.id;
            if (user.psw) {
                const psw = sha1(user.psw);
                user.psw = psw;
            }
            const data = await this.ctx.service.users.updateuser(user);
            if (data.affectedRows == 1) {
                const newUser = await this.ctx.service.users.find({id: user.id});
                this.ctx.session.user = newUser;
                this.ctx.body = {status: 1, msg: "更新成功"}
            } else {
                this.ctx.body = {status: 0, msg: "更新失败"}
            }
        }

        async articleedit() {
            const ctx = this.ctx;
            const id = ctx.params.id;
            const data = await ctx.service.view.find(id);
            var title;
            if (data != null) {
                title = data[0].title;
            } else {
                title = "";
                ctx.body = {status: 0, msg: "无更多数据"}
                return;
            }
            if (data[0].uid != ctx.session.user.id) {
                ctx.redirect("/");
                return;
            }
            await this.ctx.render('articleedit.html', {
                title: title + "--文章修改",
                user: this.ctx.session.user,
                article: data[0],
                type: this.app.config.type
            });
        }

        async articleupdate() {
            const ctx = this.ctx;
            const id = ctx.params.id;
            const parmar = ctx.request.body;
            parmar.aid = id;
            const article = await ctx.service.users.articleFind({aid: id}, 0);
            if (article[0].uid != ctx.session.user.id) {
                this.ctx.body = {status: 0, msg: "权限不够"}
                return;
            }
            const data = await ctx.service.users.updatearticle(parmar);
            if (data.affectedRows == 1) {
                this.ctx.body = {status: 1, msg: "更新成功", id: id}
            } else {
                this.ctx.body = {status: 0, msg: "更新失败"}
            }
        }

        async articledel() {
            const ctx = this.ctx;
            const id = ctx.request.body.id;
            const article = await ctx.service.users.articleFind({aid: id}, 0);
            if (article[0].uid != ctx.session.user.id) {
                this.ctx.body = {status: 0, msg: "权限不够"}
                return;
            }
            const data = await ctx.service.users.articledel(id);
            if (data.affectedRows == 1) {
                this.ctx.body = {status: 1, msg: "删除成功"}
            } else {
                this.ctx.body = {status: 0, msg: "删除失败"}
            }

        }

        async articlefavorite() {
            const ctx = this.ctx;
            if (!ctx.session.user) {
                ctx.body = {status: 0, msg: "请先登录"};
                return;
            }
            const obj = ctx.request.body;
            obj.fv_time = ctx.helper.getNowTime();
            obj.fv_uid = ctx.session.user.id;
            const result = await ctx.service.users.favoritefind({
                fv_uid: obj.fv_uid,
                fv_aid: obj.fv_aid,
                fv_module: this.app.config.favorite[0].val
            });
            if (result != null) {
                this.ctx.body = {status: 0, msg: "已经收藏过了"}
                return;
            }
            const data = await ctx.service.users.favoriteinsert(obj);
            if (data.affectedRows == 1) {
                const articleupdate = await
                    ctx.service.users.favoriteupdate(obj.fv_aid);
                if (articleupdate.affectedRows == 1) {
                    this.ctx.body = {status: 1, msg: "收藏成功"}
                } else {
                    this.ctx.body = {status: 0, msg: "收藏失败"}
                }

            } else {
                this.ctx.body = {status: 0, msg: "插入失败"}
            }

        }

        async articlefavoriteGet() {
            const ctx = this.ctx;
            const data = await ctx.service.users.favoriteget(ctx.session.user.id, this.app.config.favorite[0].val, ctx.query.page || 0);
            if (data != null) {
                this.ctx.body = {status: 1, msg: "获取成功", data: data}
            } else {
                this.ctx.body = {status: 0, msg: "无更多数据"}
            }

        }

        async getComment(){
            const ctx=this.ctx;
            const {id,type,page} = ctx.query;
            var data = await ctx.service.users.getComment(id,type,page);
            var _this=this;
             if(data.length<=0){
                 ctx.body = {status: 0, msg: "无更多评论数据"}
                 return ;
             }
            var start = async function () {
                for (var i = 0; i < data.length; i++) {
                   var comments=  await _this.getCommentReply(id,data[i].id,0);
                    data[i].comments=comments;

                }
            };
           await start();
           ctx.body = {status: 1, msg: "获取成功", data:  data}

        }

        async getCommentReply(id,target,page){
           const data= await this.ctx.service.users.getCommentReply(id,target,page);
           return data
        }


        async insertComment(){
            if (!this.ctx.session.user) {
                console.log("sss")
                this.ctx.body = {status: 0, msg: "请登录"}
                return;
            }
            const query=this.ctx.request.body;
            console.log(query)
            var from_id=query.from_id,
                to_id=query.to_id,
                content=query.content,
                article_id=query.article_id,
                parent_type=query.parent_type,
                parent_id=query.parent_id;
             var obj={};
             if(!from_id || !content || !parent_type||!article_id){
                 this.ctx.body={status:0,msg:'必要参数不能为空'}
                 return
             }
            obj.from_id=from_id;
            obj.content=content;
            obj.parent_type=parent_type;
            obj.article_id=article_id;
            if(parent_type==2 || parent_type==3){
                if(!parent_id||!to_id){
                    this.ctx.body={status:0,msg:'必要参数不能为空'}
                    return
                }
                obj.to_id=to_id;
                obj.parent_id=parent_id;
            }

            obj.c_time= this.app.mysql.literals.now;
            const data=await this.ctx.service.users.insertComment(obj);
            if (data.affectedRows == 1) {
                this.ctx.body = {status: 1, msg: "评论成功"}
            } else {
                this.ctx.body = {status: 0, msg: "评论失败"}
            }

        }


    }
    return UsersController;
};