/**
 * 文章检索
 * type 0 全部
 * type 1 电影
 * type 2 IT
 * type 3 PPT
 * type 4 DOC
 */
module.exports = app => {
    class NewsService extends app.Service {
        * find(type,title,page) {
            const Literal = this.app.mysql.literals.Literal;
            const sqlt= new Literal(`CONCAT("%", "${title}","%")`);
            var pageSize=this.app.config.pageSize;
            var atype=type==0?"":'and type='+this.app.mysql.escape(type);
            var atitle=title==""?"":'and title like '+ sqlt;
            var query='select * from article where passed=1 '+atype+' '+atitle+' order by time desc limit '+pageSize*this.app.mysql.escape(page)+', '+pageSize+'';
            console.log(query)
            const article = yield app.mysql.query(query );
            return article
        }
    }
    return NewsService;
};