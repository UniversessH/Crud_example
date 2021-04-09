# Crud_example

### Crud_example的个人实现版本

1. 技术栈:node.js + express + ejs + axios + mongoDB（基于腾讯云服务器搭建)
2. https://zellwk.com/blog/crud-express-mongodb/ 原op网址

### Crud_example中遇到的问题

#### 1.main.js不被引入

原因为，使用了`app.use(express.static('public'))`后，使得public文件夹能够访问，所以在

index.html中**不需要通过相对路径**写`<script src = "../public/main.js">`，而是直接写`<script src = "/main.js">`

#### 2.在写页面逻辑时使用了require从而导致没办法正常使用

原因：cjs语法只能在node里使用，但可以通过babel , rollup , webpack之类的东西实现语法转译

此处通过browerify将其转译为bundle.js，并在页面中引入bundle即可正常使用

#### 3.node中如何支持esm的import?

事实上在新版本的node中已经支持了esm，只需要在页面引入js文件时加上`type = "module"`

即可实现

#### 4.使用import导入axios(`import axios from 'axios'`) 时报错

报错内容为

`Uncaught TypeError: Failed to resolve module specifier "axios". Relative references must start with either "/", "./", or "../".`

解决办法：配置webpack来自动导入依赖的module

