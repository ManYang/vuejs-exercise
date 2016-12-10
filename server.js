// 引入必要的模块
var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.config')
var mongoose = require('mongoose');
//for parse the params in req body
var bodyParser = require('body-parser');
//import schema
var Todo = require('./models/todoSchema');
// 创建一个express实例
var app = express();

// 调用webpack并把配置传递过去
var compiler = webpack(config);

// 使用 webpack-dev-middleware 中间件
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
})

// Connect to MongoDB and create/use database called todoAppTest
mongoose.connect('mongodb://localhost/todoAppTest');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//get api
app.get('/list', function (req, res, next) {
Todo.find( function(err, todo){
    if(err) res.send(err);
    else
        res.json(todo);
  });
});

app.get('/list/:id', function (req, res, next) {
  Todo.findById(req.params.id, function(err, todo){
    if(err) res.send(err);
    else
        res.json(todo);
  });
});

//post api
//create new one
app.post('/list', function (req, res, next) {
    //console.log(req.body);
    var todo = new Todo({
        name: req.body.name,
        completed: req.body.completed, 
        note: req.body.note, tags: req.body.tags, 
        updated_at:req.body.updated_at
    });
    //res.json(req);
    todo.save(function(err){
      if(err)
        console.log(err);
      else{
        //get all todos
        Todo.find( function(err, todo){
            if(err) res.send(err);
            else
                res.json(todo);
        });
      }
    });
});

//update api
//update name, note and date
app.post('/list/:id', function (req, res, next) {
  Todo.findByIdAndUpdate(req.params.id,
    {
        name: req.body.name, 
        completed: req.body.completed, 
        note: req.body.note,tags: 
        req.body.tags, 
        updated_at:req.body.updated_at
    },
    function(err, todo){
    if(err) res.send(err);
    else{
        //get all todos
        Todo.find( function(err, todo){
            if(err) res.send(err);
            else
                res.json(todo);
        });
      }
  });
});

//del api
app.delete('/list/:id', function (req, res, next) {
  Todo.findByIdAndRemove(req.params.id,function(err, todo){
    if(err) res.send(err);
    else{
        //get all todos
        Todo.find( function(err, todo){
            if(err) res.send(err);
            else
                res.json(todo);
        });
      }
  });
});

// 使用 webpack-hot-middleware 中间件
var hotMiddleware = require('webpack-hot-middleware')(compiler)

// webpack插件，监听html文件改变事件
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        // 发布事件
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})

// 注册中间件
app.use(devMiddleware)
// 注册中间件
app.use(hotMiddleware)

// 监听 8888端口，开启服务器
app.listen(8888, function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening at http://localhost:8888')
})