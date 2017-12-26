/**
 * 登录中间键
 */
module.exports = () => {
    return function* (next) {
        yield next;
        if(this.path=='/sign'||this.path=='/signup'){
            if(!this.session.user){
                return ;
            }else{
                this.redirect('/');
            }
        }else{
            if(!this.session.user){
                this.redirect('/sign');
            }
        }

    };
};
