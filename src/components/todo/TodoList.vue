<template>
  <base-badge>
    <div v-if="list.length === 0">
      <p v-if="filter === 'all'">
        No tasks. Click 'Add Task' to start achive goals!
      </p>
      <p v-else-if="filter === 'completed'">No completed tasks!</p>
      <p v-else-if="filter === 'active'">No tasks to complete!</p>
    </div>
    <ul>
      <todo-item
        v-for="todo in list"
        :key="todo.id"
        :id="todo.id"
        :task="todo.task"
        :date="todo.date"
        :done="todo.done"
      ></todo-item>
    </ul>
  </base-badge>
</template>

<script setup>
import TodoItem from "./TodoItem.vue";
import { defineProps } from "vue";

defineProps(["list", "filter"]);
</script>

<style scoped>
ul {
  margin: 0;
}
ul li {
  margin-bottom: 20px;
}
ul li:last-child {
  margin-bottom: 0;
}
</style>
