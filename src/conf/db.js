const env = process.env.NODE_ENV; // 获取环境变量；

let MYSQL_CONF;

if (env === 'dev') { // 开发环境的数据库地址
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'Miao1116',
    port: '3306',
    database: 'myblog',
  }
}

if (env === 'production') { // 生产环境的数据库地址
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'Miao1116',
    port: '3306',
    database: 'myblog',
  }
}

module.exports = {
  MYSQL_CONF, 
}