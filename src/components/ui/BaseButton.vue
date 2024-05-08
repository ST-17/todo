<template>
  <button><slot></slot></button>
</template>

<script setup></script>

<style scoped>
button {
  font-size: 20px;
  padding: 10px 15px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  background: rgba(87, 87, 233, 0.8);
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
button:hover {
  color: rgba(255, 255, 255);
  background: rgba(87, 87, 233);
}
</style>
