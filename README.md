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