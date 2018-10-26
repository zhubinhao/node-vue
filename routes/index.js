module.exports = function (app) {
  //登录模块
  var login = require('./../www/login');
  app.use('/users', login);
  var article  = require('./../www/article')
  app.use('/article',article)
}
