<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <a-layout-header>
      <a-menu
        class="menu"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">
          <NuxtLink to="/">HOME</NuxtLink>
        </a-menu-item>
        <a-menu-item key="2">
          <NuxtLink to="/crusader">CRUSADER</NuxtLink>
        </a-menu-item>
        <a-menu-item key="3">
          <NuxtLink to="/strongholder">STRONGHOLDER</NuxtLink>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content>
      <Nuxt />
    </a-layout-content>
  </a-layout>
</template>

<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.submitBR {
  float: right;
  margin-left: auto;
  background-color: #199687;
}

.layout {
  height: 100%;
}

#__nuxt {
  height: 100%;
}
#__layout {
  height: 100%;
}
</style>
