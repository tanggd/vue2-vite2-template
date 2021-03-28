# 使用 vite2 从零开始搭建 vue2 项目开发环境

本笔记是使用 `vite2` 从零开始搭建 `vue2` 项目开发环境的记录。

搭建起因：基于 `vue-cli` 的项目，由于项目模块很多，热更新及其慢，影响开发体验，于是才有了使用 `vite2` 搭建 `vue2` 项目的想法。vite 是一个由原生 ESM 驱动的 Web 开发构建工具



以前我们使用vue2搭建的项目，使用TypeScript需要借助插件 class-component，

主要使用到的技术点：

- vite@2.1.2
- vue@2.6.12
- TypeScript
- @vue/composition-api@1.0.0-rc.5
- vue-router@3.5.1
- vuex@3.6.2
- sass/scss
- 

前置条件：

- `Vite2` 需要 `Node.js` 版本 `>= 12.0.0`。若低于该版本，启动项目会出现错误，错误详情见[（https://github.com/vitejs/vite/issues/1700）](https://github.com/vitejs/vite/issues/1700)

## 搭建步骤

### 初始化项目架子

新建空文件夹，在该文件夹下初始化 package.json 文件。

```bash
npm init
```

安装 vite

```bash
npm install vite -D
```

在 package.json 中配置 scripts

```javascript
"scripts": {
    "dev": "vite",
    "build": "vite build"
}
```

并在 package.json 同级目录下新建 index.html，作为入口文件。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>vite2搭建vue2开发环境</title>
  </head>
  <body>
    vite2搭建vue2开发环境
  </body>
</html>
```

启动项目 npm run dev，即可把项目跑起来，在浏览器访问 http://192.168.1.2:3000/

在 index.html 中修改 body 内容，即可看见浏览器中视图的热更新。

至此，我们的项目基础架子便搭建好了。

### 引入 vue

安装vue

```bash
npm install vue
```

新建 src 目录，并在该目录下新建main.ts文件、App.vue文件。

```typescript
// main.ts
import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})
```

```html
// App.vue
<template>
  <div>
    template
  </div>
</template>
```

此时我们发现项目抛出了错误

```bash
[vite] Internal server error: Failed to parse source for import analysis because the content contains invalid JS syntax. Install @vitejs/plugin-vue to handle .vue files.
```

无法解析vue文件。

由于我们使用的vue2，而不是vue3，该插件不可用，所以我们可以借助官方推荐的插件[vite-plugin-vue2](https://github.com/underfin/vite-plugin-vue2)

```
npm i vite-plugin-vue2 -D
```

新建vite.config.ts，并配置

```typescript
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

export default defineConfig({
  plugins: [
    createVuePlugin()
  ],
})
```

重启项目，即可在浏览器中看见我们App.vue中写的内容了。

修改App.vue，浏览器热更新内容。

### 引入composition-api

在vue2中要使用composition-api，需要借助插件[@vue/composition-api](https://github.com/vuejs/composition-api)

```bash
npm install @vue/composition-api
```

在main.ts中使用

```typescript
import Vue from 'vue'
import App from './App.vue'
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)

new Vue({
  el: '#app',
  render: h => h(App)
})
```

由于我们使用的是TypeScript，为了获得传递给 `setup()` 参数的类型推断，最好使用 defineComponent。

修改App.vue

```html
<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from '@vue/composition-api'
export default defineComponent({
  name: 'App',
  setup() {
    const msg = ref('Hello Vite2')
    return {
      msg
    }
  },
})
</script>
```

### 引入 vue-router

安装 vue-router

```bash
npm install vue-router
```

在src目录下新建views目录，并在该目录下新建home和about目录，分别建index.vue

```html
// views/home/index.vue
<template>
  <div>
    home page
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  name: 'Home',
  setup() {
    return {}
  }
})
</script>

// views/about/index.vue
<template>
  <div>
    about page
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  name: 'About',
  setup() {
    return {}
  }
})
</script>
```

在src目录下新建router目录，并新建index.ts文件

```typescript
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [{
    path: '/',
    redirect: 'home'
}, {
  path: '/home',
  name: 'home',
  component: () => import('../views/home/index.vue')
}, {
    path: '/about',
    name: 'about',
    component: () => import('../views/about/index.vue')
}]

export default new Router({
    mode: 'hash',
    routes: routes
})
```

在main.ts中使用

```typescript
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
```

修改App.vue

```html
<template>
  <div>
    <h1>{{ msg }}</h1>
    <nav>
      <router-link to="/home">Home</router-link> | 
      <router-link to="/about">About</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from '@vue/composition-api'
export default defineComponent({
  name: 'App',
  setup() {
    const msg = ref('Hello Vite2')
    return {
      msg
    }
  },
})
</script>
```

至此，router已经搭建好了。

既然我们选择了TypeScript，那就给router添加类型。

vue-router中为我们提供了类型声明文件，我们可以直接导入使用。

```typescript
// router/index.ts
import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'

Vue.use(Router)

const routes: Array<RouteConfig> = [{
    path: '/',
    redirect: 'home'
}, {
  path: '/home',
  name: 'home',
  component: () => import('../views/home/index.vue')
}, {
    path: '/about',
    name: 'about',
    component: () => import('../views/about/index.vue')
}]

export default new Router({
    mode: 'hash',
    routes: routes
})
```

### 引入vuex

安装vuex

```bash
npm install vuex
```

在src目录下新建store目录，并新建index.ts

todo ...... 类型问题

```typescript
import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'

Vue.use(Vuex)

interface AnyObj {
  [x: string]: any
}

const store: StoreOptions<AnyObj> = new Vuex.Store({
  state: {
    count: 0
  },
  getters: {},
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {},
  modules: {}
})

export default store
```

在main.ts中使用：

```typescript
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
```

对于简单的数据管理，可以使用composition api、或vue.obserable()解决。

### 引入sass

安装sass

```bash
npm install sass -D
```

至此我们便可以支持.scss、.sass文件。

当然我们还可以通过在文件扩展名前加上 `.module` 来结合使用 CSS modules 和预处理器，例如 `style.module.scss`。

TODO：解决.scss文件模块找不到的问题

### 增加类型文件

在搭建的过程中，我们会发现在引入.vue文件处，vscode会提示错误。比如在main.ts中`import App from './App.vue'`处，会提示”找不到模块“./App.vue”或其相应的类型声明。ts(2307)“。这错误提示不是我们的代码有问题，而是vscode不能识别.vue文件模块。

解决办法：增加类型文件。

在src目录下新建shims-vue.d.ts文件，配置内容：

```typescript
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
```



### tsconfig.json

TODO：这个文件是否需要？ts是否应该安装在package？

## 参考文档

- [Vite 中文文档](https://vitejs.bootcss.com/guide/)
- [vite-plugin-vue2](https://github.com/underfin/vite-plugin-vue2)
- [@vue/composition-api](https://github.com/vuejs/composition-api) 在vue2项目中使用composition api的插件
- [vue-composition-api手册](https://vue3js.cn/vue-composition-api/) 针对vue3的composition api手册，虽然[@vue/composition-api](https://github.com/vuejs/composition-api)缺失部分API，但是大多数API都可以参考该手册，用法基本一致，有些许不同，以及某些API实现不同，但表现一致，也方便我们后期迁移到vue3。
- 







https://zhuanlan.zhihu.com/p/149033579

https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651572676&idx=2&sn=1548957169704b035fe7a7ce05ffb54a&chksm=80251e05b752971385c90e70c9f0a13790c5b6cbc1c35dd91127bf37ab101fbe3dd8b56e5df7&mpshare=1&scene=24&srcid=0319zD9riI9pZTv4bsVPALq3&sharer_sharetime=1616126765443&sharer_shareid=3449aa5164376cd3e34aec1e4aca0f21#rd



https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651565768&idx=2&sn=f0ad0060e38717d30ea1f2ffc8bd8778&chksm=80257909b752f01f6ba2f4d248b486bf60604333b0e0260699010c29967aa2a166a4e451e38e&scene=21#wechat_redirect