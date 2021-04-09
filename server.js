const bodyParser = require('body-parser') //引入bodyParser
const express = require("express") //引入Express
const app = express() //设置app作为Express实例
const MongoClient = require('mongodb').MongoClient //引入MongoDB服务
const { Cursor } = require("mongodb")//这是啥？
const url = "mongodb://crud_exp_owner:密码不给你看@81.68.IP不给你看:端口不给你看/crud_exp"

MongoClient.connect(url, {
  useUnifiedTopology: true //必加，去除警告
}, (err, client) => {
  if (err) return console.error(err)//错误处理
  console.log('Connected to Database')

  const db = client.db('crud_exp') 
  const quotesCollection = db.collection('quotes') //声明一个collection

  app.set('view engine','ejs') //启用ejs作为视图引擎

  app.listen(3001, function () {  //创建本地服务器并指定端口
    console.log("listening on 3001")
  })

  app.use(express.static('public'))//通过此中间件使得public文件夹能够访问
  app.use(bodyParser.urlencoded({ extended: true })) //中间件，使Express能够从form表单中读取数据，同时在发出请求前整理请求体
  app.use(bodyParser.json())//使服务器能够读取json

  app.get('/', (req, res) => {
    quotesCollection.find().toArray()
      .then(results => {
        console.log(results)
        res.render('index.ejs',{quotes:results})
      })
      .catch(error => console.log(error))
    //console.log(cursor)
    //res.sendFile("D:/TodoList_on_CRUD" + "/index.html")
  })

  app.post('/quotes', (req, res) => {
    //console.log(req.body)
    quotesCollection.insertOne(req.body)
    .then(result => {
      console.log("success")
      res.redirect('/')
    })
    .catch(error => console.error(error))
  })
  
  app.put('/quotes',(req,res)=>{
    console.log(req.body)
    quotesCollection.findOneAndUpdate(
      {name : "dd"},
      {
        $set:{
          name:req.body.name,
          quote:req.body.quote
        }
      },
      {
        upsert:true //如果没有相应数据储存则插入该数据(rep.body)
      }
    )
      .then(result => {
        
      })
      .catch(error => console.error(error))
  })
})

app.delete('/quotes',(req,res) => {
  quotesCollection.deleteOne(
    {name: req.body.name},
  )
    .then(result => {
      res.json('Delete Success!')
    })
    .catch(error => console(error))
})

