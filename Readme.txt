1.文档结构
--node_modules 存放npm
--public 存放web开发的公共资源（包括bootstrap包）
--schemas 简单的说，schema 就是如何定义数据的结构。在mongoose里面，schema用JSON object作为定义。
--models Models与mongoDB的document是一对一关系建立的，schema打包成为model,model会生成所有的document的update,add,save,read method.
最简单的来说，生成一个model的方式
--views 存放web页面（使用jade作为前端模板）
--.bowerrc 存放bower的默认位置
--package.json 初始化程序包括npm
--bower.json 初始化bower
2.使用
注意要安装过node/npm/mongodb
先初始化例如如果放在d盘根目录d:\movie
控制台
$d:
$cd movie
$npm insatll 
$bower install
$node app.js //这一步之前要打开mongodb

具体可以参考幕课网课程http://www.imooc.com/learn/75
声明：所有代码参考该课程 