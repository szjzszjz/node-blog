# nodejs-blog
nodejs blog server

### [vue-my-blog 前端工程地址](https://github.com/szjzszjz/vue-my-blog)
### [数据库表](https://github.com/szjzszjz/node-blog-1/blob/connect-mysql/static/node-blog.sql)

### [windows安装redis](http://note.youdao.com/noteshare?id=decd9cc0d507394d4d74808815003005&sub=65FFE0136F2849E8ADEF67094FA7CDFF)
### [windows安装nginx](http://note.youdao.com/noteshare?id=8d98c01d2b7aac1dae9f7846c29b85c8&sub=7BB65C7DB0D843279BC3E251EF352913)

### nginx配置文件内容
通过nginx实现反向代理
```text
worker_processes  1;

events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       8080;
        server_name  localhost;

		location / {
			proxy_pass http://localhost:8001;
		}
		
		location /api/ {
			proxy_pass http://localhost:8000;
			proxy_set_header Host $host;
		}
		
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```
### 安装命令 
```text
npm install -g eslint
npm i redis --save
npm i mysql --save
npm install nodemon --save
npm install cross-env --save-dev
npm install http-server
npm install node-uuid

```

## 项目第二阶段 node-blog-express  
全局安装利用express-generator一件生成工程初始化架构  
命令：`npm install express-generator -g`  
创建express工程   
命令：`express node-blog-express`  
安装工程依赖  
命令：`npm install`  
启动工程  
命令：`npm start`  
安装自启动工具  
命令：`
npm install nodemon --save
npm install cross-env --save-dev`  
安装express-session  
命令；`npm i express-session  --save`  
安装Redis  
命令：`npm i redis connect-redis --save`  

### vscode nodejs智能提示typings安装
逐一执行下面代码
```text
// 下载rypings包
cnpm install -g typings
//查看是否安装
typings -v 
// 进入项目文件下安装
typings init
//安装 node 插件
typings install dt~node --global --save
```