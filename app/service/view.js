// app/service/users.js
//首页文章分页获取
module.exports = app => {
    return class article extends app.Service {
       async find(id) {

            const article = await app.mysql.query ('select * from article, users where  article.uid=users.id and article.aid=?',[id]);
            return article;
        }
    }
};