<template>
  <Header :class="{ 'header-order': $route.path === '/order' }" />
  <Nav v-if="$route.path !== '/order'" />
  <main>
    <router-view />
  </main>
  <footer></footer>
</template>

<script>
import Header from '@/components/Header.vue'
import Nav from '@/components/Nav'

export default {
  components: {
    Header,
    Nav,
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
body,
html {
  padding: 0;
  margin: 0;
  background: #fff;
  font-size: 16px;
  line-height: 1.4;
  scroll-behavior: smooth;
}
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
  scroll-behavior: smooth;
  position: relative;
}
h2,
p {
  margin-top: 8px;
  margin-bottom: 8px;
}
a {
  text-decoration: none;
  color: #000;
}
ul {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}
.container {
  max-width: 1280px;
  margin: 0 auto;
  @media only screen and (max-width: 1320px) {
    width: 90%;
  }
}
h1 {
  font-size: 36px;
  text-align: left;
}
h2 {
  font-size: 24px;
  text-align: left;
}
h3 {
  font-size: 18px;
  text-align: left;
}
.section {
  padding-top: 50px;
  &-title {
    font-size: 36px;
    text-align: left;
    font-weight: 500;
  }
  &-subtitle {
    text-align: left;
  }
}
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #c01111;
  border-radius: 999px;
  font-weight: 500;
  height: 40px;
  min-width: 120px;
  padding: 8px 20px;
  cursor: pointer;
  outline: transparent;
  position: relative;
  border: none;
  background: rgba(#b31010, 0.2);
  &:hover {
    background: rgba(#b31010, 0.3);
  }
  &.accent {
    color: #fff;
    background: #c01111;
    &:hover {
      background: #b31010;
    }
  }
}
</style>
