'use strict';

// app/router.js
module.exports = app => {
    const auth=app.middleware.auth();
    const adminAuto=app.middleware.adminAuto();
    app.get('/', app.controller.home.index);
    app.get('/view/:id', app.controller.view.find); //获取文章内容
    app.get('/search', app.controller.search.find);
    app.get('/error', app.controller.error.index);//404
    app.get('/signup', app.controller.users.signup);//用户注册
    app.post('/signup', app.controller.users.insert);//用户注册接口
    app.get('/useredit',auth, app.controller.users.useredit);//用户修改
    app.post('/useredit',auth, app.controller.users.updateuser);//用户修改
    app.get('/sign', app.controller.users.sign);//用户登录
    app.post('/sign', app.controller.users.login);//登录接口
    app.get('/signout', app.controller.users.signout);//退出接口
    app.get('/center',auth, app.controller.users.center);//个人中心
    app.get('/mypublish',auth, app.controller.users.mypublish);//个人文章
    app.post('/upload', app.controller.users.upload);//图片上传
    app.get('/publish',auth,app.controller.users.publishGet);//文章发布
    app.post('/publish',auth, app.controller.users.publishPost);//文章发布
    app.get('/articleedit/:id',auth,app.controller.users.articleedit);//文章修改
    app.post('/articleedit/:id',auth,app.controller.users.articleupdate);//文章修改
    app.post('/articledel',auth,app.controller.users.articledel);//文章删除
    app.post('/favarticle',app.controller.users.articlefavorite);//收藏文章
    app.get('/favarticle',auth,app.controller.users.articlefavoriteGet);//获取收藏文章
    app.get('/getComment',app.controller.users.getComment);//获取文章评论
    app.post('/insertComment',app.controller.users.insertComment);//发表评论
    //后台管理
    app.get('/admin/sign',adminAuto,app.controller.admin.sign);//登录页
    app.post('/admin/sign',app.controller.admin.postSign);//登录页
    app.get('/admin/signout', app.controller.admin.signout);//退出接口
    app.get('/admin/user',adminAuto, app.controller.admin.userList);//会员列表
    app.get('/admin/getUser', adminAuto,app.controller.admin.getUser);//会员列表
    app.get('/admin/captcha',app.controller.admin.captcha);//验证码接口

    app.get('/admin',adminAuto,app.controller.admin.home);//管理员首页
    app.get('/admin/main',adminAuto,app.controller.admin.main);//管理员首页
    app.get('/admin/articleList',adminAuto,app.controller.admin.articleList);//文章列表
    app.post('/admin/articleCheck',adminAuto,app.controller.admin.articleCheck);//文章列表
    app.get('/admin/view/:id',adminAuto,app.controller.admin.view);//管理员浏览
    app.get('/admin/publish',adminAuto,app.controller.admin.publishGet);//文章发布
    app.post('/admin/publish',adminAuto,app.controller.admin.publishPost);//文章发布
    app.get('/admin/articleedit/:id',adminAuto,app.controller.admin.articleedit);//文章修改
    app.post('/admin/articleedit/:id',adminAuto,app.controller.admin.articleupdate);//文章修改

};