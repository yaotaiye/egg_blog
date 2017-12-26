'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1509345449449_4500';

  // 默认所有路由必须经过的中间件
 config.middleware = ['notfoundHander' ];
  // 添加 view 配置
  config.view = {
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.html': 'nunjucks',
        },
    };
  //分页
  config.pageSize=3;

    //数据库配置
    config.mysql = {
        // 单数据库信息配置
        client: {
            // host
            host: 'localhost',
            // 端口号
            port: '3306',
            // 用户名
            user: 'root',
            // 密码
            password: '123456',
            // 数据库名
            database: 'msd',
        },
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: false,
    };
    config.notfound= {
        pageUrl: '/error.html',
    };
    //安全设置
    config.security = {
        csrf: {
            queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
            bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
            headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
            useSession: false, // 默认为 false，当设置为 true 时，将会把 csrf token 保存到 Session 中
            cookieName: 'csrfToken', // Cookie 中的字段名，默认为 csrfToken
            sessionName: 'csrfToken', // Session 中的字段名，默认为 csrfToken
        },
    };
    //文章类别
    config.type=[
            {val:1,txt:"电影资源"},
            {val:2,txt:"IT"},
            {val:3,txt:"PPT"},
            {val:4,txt:"DOC"},
        ];
    config.favorite=[
        {val:1,txt:"收藏文章"},
        {val:2,txt:"关注用户"},
        {val:3,txt:"点赞文章"},
        {val:4,txt:"举报文章"},
    ];

  return config;
};

