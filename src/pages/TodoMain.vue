<template>
  <section>
    <header>
      <router-link to="/addTask">
        <base-button>Add Task</base-button>
      </router-link>
      <select v-model="filter">
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
    </header>
    <todo-list :list="todos" :filter="filter"></todo-list>
  </section>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import TodoList from "@/components/todo/TodoList.vue";
import { useStore } from "vuex";

const store = useStore();

const filter = ref("all");

watch(filter, () => {
  store.dispatch("changeFilter", filter.value);
});

const todos = computed(() => store.getters.todos);
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
select {
  width: 150px;
  font-size: 18px;
  border: none;
  background-color: rgb(180, 180, 180);
  padding: 10px 5px;
  border-radius: 8px;
  outline: 0px;
}
select:focus {
  border: none;
}
a {
  text-decoration: none;
}
</style>
