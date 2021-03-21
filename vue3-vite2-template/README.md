# vue3-template

## 主要内容

### 技术栈

- ``vue3``
- ``vite``
  - ``Vite`` 是一个由原生 ``ES Module`` 驱动的 ``Web`` 开发构建工具。在开发环境下基于浏览器原生 ``ES imports`` 开发，在生产环境下基于 ``Rollup`` 打包。
- ``typescript``
- ``vue-router``
- ``vuex``

### 初始化项目

```bash
npm create vite-app [projectName]

npm i

npm run dev
```

### 配置 ``typescript``

1. 安装 ``typescript``

```bash
npm install typescript -D
```

2. 初始化 ``tsconfig.json``

```bash
npx tsc --init
```

3. 修改文件

- 将 ``main.js`` 修改为 ``main.ts``
- 将 ``index.html`` 里面的引用修改为 ``main.ts``
- 把 ``xxx.vue`` 文件中的 ``script`` 配置上 ``lang='ts'``

```js
// eg
<script lang='ts'>
import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'App',
  components: {
    HelloWorld,
  },
}
</script>

<script lang='ts'>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
    }
  },
}
</script>
```

4. 根目录创建 ``shim.d.ts`` 文件，内容如下：

```ts
import { Component } from 'vue'
const component: Component

declare module '*.vue' {
  export default component
}
```

### 配置 ``router``

1. 安装 ``vue-router@next``

```bash
npm install vue-router@next
```

2. 在 ``src`` 目录下新建 ``router`` 目录，在该目录下新建 ``index.ts`` 文件，内容：

```ts
import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
  // 路由的模式：hash模式
  history: createWebHashHistory(),
  // 路由地址
  routes: []
})
```

3. 在 ``main.ts`` 中使用

```ts
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router/index'

const  app = createApp(App)
app.use(router)
app.mount('#app')
```

### 配置 ``vuex``

1. 安装 ``vuex``

```bash
npm install vuex@next
```

2. 在 ``src`` 目录下新建 ``store`` 目录，在该目录下新建 ``index.ts`` 文件，内容：

```ts
import { createStore } from 'vuex'

interface State {
  userName: string
}

export default createStore({
  state(): State {
    return {
      userName: 'tang'
    }
  }
})
```

3. 在 ``main.ts`` 中使用

```ts
```
