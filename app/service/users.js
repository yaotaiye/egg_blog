// app/service/users.js
module.exports = app => {
    return class Users extends app.Service {
        async find(user) {
            const result = await app.mysql.get('users', user);
            return result;
        }

        async insert(user){
            const result = await this.app.mysql.insert('users', user);
            return result;
        }
        async articleInsert(article){
            const ctx = this.ctx;
            const result = await this.app.mysql.insert('article', article);
            return result;
        }
        async articleFind(where,page){
            const pageSize=this.app.config.pageSize;
         //   const  data=yield this.app.mysql.query('select * from article where '+ where+' order by time desc limit '+pageSize*page+', '+pageSize+'')
            const  data=await this.app.mysql.select('article',{
                where:where,
                limit:pageSize,
                offset:pageSize*page,
                orders: [ ['time','desc']], // 排序方式
            });
            return data;
        }
        async updateuser(user){
            const result = await this.app.mysql.update('users', user);
            return result;
        }
        async updatearticle(article){
         const result = await this.app.mysql.query('update article set title=?,summary =?,price=?,cover=?,content=?, time = NOW() where aid = ?',[article.title,article.summary,article.price,article.cover,article.content,article.aid]);
            return result;
        }
        async articledel(id){
            const result = await this.app.mysql.delete("article",{aid:id});
            return result;
        }
        async favoriteinsert(obj){
            const result = await this.app.mysql.insert('favorite', obj);
            return result;
            }
        async favoritefind(obj){
            const result = await this.app.mysql.get('favorite', obj);
            return result;
        }
        //name:自增的字段；id:文章id
        async favoriteupdate(id){
            const  result=await this.app.mysql.query('update article set favorite=(favorite+?) where aid=?',[1,id]);
             return result;
            }
        async favoriteget(id,type,page){
            const pageSize=this.app.config.pageSize;
            return await this.app.mysql.query('select * from article a inner join favorite b on a.aid=b.fv_aid and b.fv_uid=? and b.fv_module=? order by a.time desc limit ?, ?',[id,type,pageSize*page,pageSize]);

        }
        async getComment(id,type,page){
         const pageSize=10;
          return await this.app.mysql.query('select comment.* ,users.id as uid ,users.cname,users.avatar from comment,users where comment.from_id=users.id and comment.article_id=? and comment.parent_type=? order by comment.likeCount desc ,comment.c_time desc limit ?, ?',[id,type,pageSize*page,pageSize]);
        }
        async getCommentReply(id,parentId,page){
            const pageSize=20;
            const data=await this.app.mysql.query('select comment.* ,users.id as uid ,users.cname from comment,users where users.id in(comment.from_id,comment.to_id)   and comment.article_id=? and comment.parent_id=? and comment.parent_type in(2,3) order by comment.c_time asc limit ?, ?',[id,parentId,pageSize*page,pageSize]);
            var result=[];
            if(data.length>0){
                data.forEach(function (item,index) {
                    if(index%2==0 && index<data.length-1){
                       result.push(data[index]);
                        var r_index=index/2;
                        var n_index=index+1;
                        if( data[index].from_id==data[index].uid){
                            result[r_index].t_uid=data[n_index].uid;
                            result[r_index].t_cname=data[n_index].cname;
                        }else{
                            result[r_index].t_uid=data[index].uid;
                            result[r_index].t_cname=data[index].cname;
                            result[r_index].uid=data[n_index].uid;
                            result[r_index].cname=data[n_index].cname;
                        }
                  }
                });

            }
            return result;
        }
        async insertComment(obj){
            const result = await this.app.mysql.insert('comment', obj);
            return result;
        }


    }
};