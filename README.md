# egg-youtobe-frontend

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### shims-vue.d.ts
```ts
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```
- 是什么? ===> `typescript` 中的 类型声明文件
- 为什么? ===> 加载`.vue`文件的时候, `TS 编译器` 不知道它的类型是什么? 
- 怎么做? ===> 在根目录下创建`shims-vue.d.ts`文件
- 什么用? ===> 所有以`.vue`结尾的文件模块, 它的类型就是这里导出的类型(`componenet`), 这个`componenet` 对应的就是 `DefineComponent`, 来自于`Vue`本身. 这样在加载`vue`组件的时候,`typescript`才能正确的识别出它的类型


### 配置不同环境的变量
- .`env.development`: `npm run serve` 加载的环境变量配置文件
- `.env.production`: `npm run build` 加载的环境变量配置文件
- 配置的变量名称以`VUE_APP_`开头: `VUE_APP_API_BASE_URL=http://127.0.0.1:7001`


### TypeScript for Vuex
- https://next.vuex.vuejs.org/guide/typescript-support.html
- steps:
1. Define the typed `InjectionKey`
2. Provide the typed `InjectionKey` when installing a store to the Vue app
3. Pass the typed `InjectionKey` to the `useStore` method


### 下载视频SDK
- 放置到`public`目录下
- 在`index.html`中引入SDK
```html
<script src="/aliyun-upload-sdk-1.5.2/lib/aliyun-oss-sdk-6.13.0.min.js"></script>
<script src="/aliyun-upload-sdk-1.5.2/lib/es6-promise.min.js"></script>
<script src="/aliyun-upload-sdk-1.5.2/aliyun-upload-sdk-1.5.2.min.js"></script>
```

### 视频播放
- https://help.aliyun.com/document_detail/125570.html
- 加入`public/index.html`
```html
 <!-- 视频播放SDK html5 -->
  <script src="https://g.alicdn.com/de/prismplayer/2.9.3/aliplayer-h5-min.js"></script>
```
- 引入样式
```html
 <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.9.3/skins/default/aliplayer-min.css" />
```

- 在播放页面 加入 阿里云播放器初始化容器
```html
<div class="prism-player" id="J_prismPlayer"></div>
```

- 加入初始化代码
```js
  var player = new Aliplayer({
            id: 'J_prismPlayer',
            width: '100%',
            autoplay: true,
            //支持播放地址播放,此播放优先级最高
            source : '播放url',
            //播放方式二：点播用户推荐
            vid : '1e067a2831b641db90d570b6480fbc40',
            playauth : 'ddd',
            cover: 'http://liveroom-img.oss-cn-qingdao.aliyuncs.com/logo.png',
            encryptType:1, //当播放私有加密流时需要设置。
            //播放方式三：仅MPS用户使用
            vid : '1e067a2831b641db90d570b6480fbc40',
            accId: 'dd',
            accSecret: 'dd',
            stsToken: 'dd',
            domainRegion: 'dd',
            authInfo: 'dd',
            //播放方式四：使用STS方式播放
            vid : '1e067a2831b641db90d570b6480fbc40',
            accessKeyId: 'dd',
            securityToken: 'dd',
            accessKeySecret: 'dd',
             region:'cn-shanghai',//eu-central-1,ap-southeast-1
            },function(player){
                console.log('播放器创建好了。')
           });
```