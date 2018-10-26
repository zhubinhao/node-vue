var express = require('express');
var router = express.Router();
const sqlhelper = require('../mysql');
const mdb = sqlhelper.db;

//查找用户文章集
router.get('/articleCollection', function (req, res) {
    let user = req.query.user;
    var sql = `select * 
    from db_article_collection as a  LEFT join db_article as b on a.id=b.collection
     where a.user="${user}" `;
    mdb.query({sql:sql,nestTables:true}, function (err, data) {
        console
        if (err) {
            console.log(err);
        } else {
            let arr1=[]
            let arr2=[]
            let arr=[]
            data.forEach(res=>{
                if(arr.indexOf(res.a.id)<0){
                    arr1.push(res.a)
                }
                arr.push(res.a.id)
                if(res.b.id!=null&&res.b.state==1){
                    arr2.push(res.b)
                }
            })
            arr1.forEach(res=>{
                res.list=[]
                arr2.forEach(data=>{
                    if(res.id==data.collection){
                        res.list.push(data)
                    }
                })
            })
            let obj={
                detalis:arr1,
            }
            obj.flog=1
            res.send( obj);
        }
    })
})
//删除文集
router.get('/deleteCollection',(req,res)=>{
    let id = req.query.id
    let user = req.query.user
    let sql = `delete from db_article_collection where id=${id} and user="${user}"`;
    console.log(sql)
    mdb.query(sql,function(err,data){
        if(err){
            console.log(err)
        }else{
            let obj={
            }
            if(data.affectedRows==1){
                obj.success=true
            }else{
                obj.success=false
            }
            obj.flog=1
            res.send( obj); 
        }
    })
})
//添加文集
router.get('/addCollection',(req,res)=>{
    let user = req.query.user
    let name = req.query.name
    let sql = `insert into db_article_collection (user,name) values ("${user}","${name}")`;
    mdb.query(sql,function(err,data){
        if(err){
            console.log(err)
        }else{
            let obj={
            }
            if(data.affectedRows==1){
                obj.success=true
            }else{
                obj.success=false
            }
            obj.flog=1
            res.send( obj); 
        }
    })
})
//修改文集
router.get('/updateCollection',(req,res)=>{
    let id = req.query.id
    let name = req.query.name
    let sql = `update  db_article_collection set name = "${name}" where id= "${id}" `;
    mdb.query(sql,function(err,data){
        if(err){
            console.log(err)
        }else{
            let obj={
            }
            if(data.affectedRows==1){
                obj.success=true
            }else{
                obj.success=false
            }
            obj.flog=1
            res.send( obj); 
        }
    })
})
//修改文章

router.post('/updateArticle',(req,res)=>{
    let time = new Date().toLocaleString()
    let title = req.body.title
    let content = req.body.content
    let id = req.body.id
    let sql = 'update  db_article set title=?,content=?,update_time=? where id=?'
    let datas = [title,content,time,id]
    mdb.query(sql,datas,function(err,data){
        if(err){
            console.log(err)
        }else{
            let obj={
            }
            if(data.affectedRows==1){
                obj.success=true
            }else{
                obj.success=false
            }
            obj.flog=1
            res.send( obj); 
        }
    })
})
//下架or发布

router.post('/release',(req,res)=>{
    let id = req.body.id;
    let state = req.body.state;
    let sql ='update db_article set release1=? where id=?'
    let datas=[state,id];
    mdb.query(sql,datas,function(err,data){
        if(err){
            console.log(err)
        }else{
            let obj={
            }
            if(data.affectedRows==1){
                obj.success=true
            }else{
                obj.success=false
            }
            obj.flog=1
            res.send( obj); 
        }
    })
})
//删除文章

router.post('/state',(req,res)=>{
    let id =req.body.id;
    let state=req.body.state;
    let sql = 'update db_article set state = ? where id=?';
    let dat = [state,id]
    mdb.query(sql,dat,function(err,data){
        if(err){
            console.log(err)
        }else{
            let obj={
            }
            if(data.affectedRows==1){
                obj.success=true
            }else{
                obj.success=false
            }
            obj.flog=1
            res.send( obj); 
        }
    })
})
//添加文章
router.post('/addArticle',(req,res)=>{
    console.log(req.body)
    let title = req.body.title
    let content = req.body.content
    let collection = req.body.collection
    let user = req.body.user
    let sql = `insert into db_article (user,title,content,collection) values ("${user}","${title}","${content}","${collection}")`;
    mdb.query(sql,function(err,data){
        if(err){
            console.log(err)
        }else{
            let obj={
            }
            if(data.affectedRows==1){
                obj.success=true
            }else{
                obj.success=false
            }
            obj.flog=1
            res.send( obj); 
        }
    })
})
module.exports = router;