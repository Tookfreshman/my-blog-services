# 启动项目

## 先启动数据库

需要先安装 mongodb，以下只讲解（window10）

```bash
#在安装好的mongodb目录bin目录下
#打开powershell（window10）
#./mongod --dbpath "xxx:/mongodb目录/data" --logpath "xxx:/mongodb目录/log" （启动mogodb）
#--dbpath 指定数据库存储路径 --logpath指定数据库日志存储路劲

#操作mogodb可以使用mongodb提供的shell
#在安装好的mongodb目录bin目录下
#打开powershell（window10）
#./mongo
```

## 启动 koa 项目

```bash
npm i -g nodemon
nodemon index.js
```
