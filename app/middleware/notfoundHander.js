// app/middleware/notfound_handler.js
module.exports = () => {
    return function* (next) {
        yield next;
        if (this.status === 404 && !this.body) {
           /* if (this.acceptJSON) this.body = { error: 'Not Found' };
            else this.body = '<h1>Page Not Found</h1>';*/
           // yield this.ctx.render('error.html', {title:404});
            this.redirect("/error");
        }
    };
};