var express = require('express');
var router = express.Router();
const sqlhelper = require('../mysql');
const mdb = sqlhelper.db;

//处理登录的逻辑
router.get('/login', function (req, res) {
    let name = req.query.name;
    let passworld = req.query.passworld;

    var sql = `select * from db_user where name="${name}" and passworld="${passworld}"`;
    //需要验证用户名和密码
    mdb.query(sql, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            // let result = validata(userinfo, data[0]);
            // req.session.username=userinfo.username 
            let obj={
                detalis:data[0]
            }
            if(data[0]===undefined){
                obj.flog=0
                obj.msg='用户名或密码错误'
            }else{
                obj.flog=1
            }
            res.send( obj);
        }
    })
})

module.exports = router;