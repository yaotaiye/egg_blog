'use strict';

// had enabled by egg
// exports.static = true;
//模板开启
exports.nunjucks = {
    enable: true,
    package: 'egg-view-nunjucks'
};
//mysql数据库
exports.mysql = {
    enable: true,
    package: 'egg-mysql',
};
//egg-session插件
exports.session = true;
exports.redis = {
    enable: true,
    package: 'egg-redis',
};