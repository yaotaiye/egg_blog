module.exports = app => {
    return class adminService extends app.Service {
        async articleList(type,start,end,title,page){
            const Literal = this.app.mysql.literals.Literal;
            const sqlt= new Literal(`CONCAT("%", "${title}","%")`);
            var pageSize=5;
            var atype=type==0?"":' type='+this.app.mysql.escape(type);
            var atitle=title==""?"":' title like '+ sqlt;
            var start=start==""?"":' time >= '+ this.app.mysql.escape(start);
            var end=end==""?"":' time <= '+ this.app.mysql.escape(end);
            var where='where';
            if( atype=="" && atitle==""&& start==""&& end==""){where="";}
            else{
                if(atype!=""&& start!=""){start=' and '+start}
                if(atype!=""|| start!=""){
                    if(end!=""){end=' and '+end}
                }
                if(atype!=""|| start!=""|| end!=""){
                    if(atitle!="") {atitle=' and '+atitle}
                }
            }
            var query='select * from article '+where+atype+start+end+atitle+' order by time desc limit '+pageSize*this.app.mysql.escape(page)+', '+pageSize+'';
            var qcount='select  count(*) as counts from article '+where+atype+start+end+atitle;
            const count = await this.app.mysql.query(qcount );
            const article = await this.app.mysql.query(query );

            return {counts:count[0].counts,article}
        }
        async adminFind(user){
                const result = await app.mysql.get('users', user);
                return result;
        }
        async articleCheck(val,id){
            const result = await app.mysql.query('update article set passed=?, where aid = ?', [val,id]);
            return result;
        }
        async find(id) {

            const article = await app.mysql.query ('select * from article, users where  article.uid=users.id and article.aid=?',[id]);
            return article;
        }
        async articleInsert(article){
            const ctx = this.ctx;
            const result = await this.app.mysql.insert('article', article);
            return result;
        }
        async userList(where,page){
            const ctx = this.ctx;
            const result = await this.app.mysql.select('users', {
                where: where, // WHERE 条件
                orders: [['time','desc']], // 排序方式
                limit: 10, // 返回数据量
                offset: 10*page, // 数据偏移量
            });

            return result;
        }
        async articleFind(id) {
            const article = await app.mysql.query ('select * from article, users where  article.uid=users.id and article.aid=?',[id]);
            return article;
        }
        async updatearticle(article){
            const result = await this.app.mysql.query('update article set title=?,summary =?,price=?,cover=?,content=?, time = NOW() where aid = ?',[article.title,article.summary,article.price,article.cover,article.content,article.aid]);
            return result;
        }
    }



}