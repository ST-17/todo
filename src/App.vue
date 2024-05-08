<template>
  <the-header></the-header>
  <section class="wrapper">
    <router-view></router-view>
  </section>
</template>

<script setup>
import TheHeader from "./components/layout/TheHeader.vue";
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Archivo");
* {
  box-sizing: border-box;
  padding: 0;
}
body {
  margin: 0;
  background-color: #d5dae1;
  font-family: Archivo, serif;
}
.wrapper {
  width: 50%;
  margin: 0 auto;
}
</style>
