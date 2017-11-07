#### react全家桶脚手架

##### 技术体系

​	**react + redux + router + webpack + ES6 + postCss +immutable**

##### 安装步骤和使用方法

1. 首先确保自己安装了node.js,然后全局安装yeoman

   ```javascript
   npm install -g yo
   ```

2. 然后安装脚手架（注意安装好脚手架之后,会自动npm install 下载所需要的关联模块，无需手动下载）

   ```javascript
   npm install -g generator-react-module-kit
   ```

3. 在需要开发react项目文件中 生成结构脚手架

   ```javascript
   yo react-module-kit
   ```

4. 会生成以下目录

   ```javascript
   ├── package.json
   ├── server.js
   ├── src
   │   ├── images
   │   ├── index.html
   │   ├── js
   │   │   ├── Component
   │   │   │   └── index.jsx
   │   │   ├── Config
   │   │   │   ├── Tool.jsx
   │   │   │   └── phonerm.js
   │   │   ├── Redux
   │   │   │   ├── Action
   │   │   │   │   └── Index.jsx
   │   │   │   ├── Reducer
   │   │   │   │   └── Index.jsx
   │   │   │   └── Store
   │   │   │       └── Store.jsx
   │   │   ├── Router
   │   │   │   └── Route.jsx
   │   │   └── public.jsx
   │   └── style
   │       └── reset.css
   └── webpack.config.js
   ```

   ​

5. 热更新开发命令(可以再package.json里面配置):

   ```
   node server.js
   ```

6. 生产命令

   ```
   npm run build
   ```



#### 需要注意的

- 配置里面的baseurl再生成项目的时候需要替换文件里面的资源文件路径，变成绝对地址。
- 本项目默认监听端口是8883，所以在浏览器输入 [http://localhost:8883](http://localhost:8883/) 就能看到效果了。
- 监听端口和实时刷新的功能都能在`webpack.config.js`文件中修改配置



#### 安装效果图

![5](https://ws4.sinaimg.cn/large/006tNc79gy1fl9nkl2ha6g30ea0n0129.gif)

