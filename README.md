# fino-database 

> fino数据仓库

fino架构下的数据仓库， 用与管理fino子模块的数据和通信

### 1.  简介

1. 全局单例模式

1. 独立命名空间和代理

   fino数据仓库会按照子模块的名字创建一系列的命名空间， 

   为每个子模块设置单独的存储区域。

   同时，为了让开发人员更快，更友好的使用

   会把当前子模块的数据代理到根对象下面

   即

   ![3761](/Users/wangdongxu/Library/Application Support/typora-user-images/image-20201217114831097.png)

    所以开发人员的访问链条是这样的。

   $data.yueqi_module001.name

   但是fino-database做了一层代理， 代理之后的访问链条

   $data.name.

   即数据仓库会把当前模块的数据和全局数据代理到根访问链下。



2. 数据安全

   当前模块不允许修改其他模块的数据

   如当前在`yueqi_module001`下面

   是不允许修改其他模块的数据的。

   例如, 运行了如下代码

   ```js
   $data.data.jinzhao_module001.name = 123
   ```

   会被拦截

   

3.  数据监听

   可以通过监听方法坚挺到数据的改变

   

4. 设置全局方法和命名空间方法



5. 每个子模块的数据各自独立



6. 通过set设置的新数据会自动代理到跟访问连下面



1. 全局数据管理`global`

   可以通过

   ```js
   $data.set({key1: 1}, 'global')
   ```

   来给fino设置一个全局数据

   全局数据会被代理到数据仓库根prototype下面， 其他子模块可以通过

   ```js
   $data.key1
   ```

   访问全局数据

2. 其他子模块的数据