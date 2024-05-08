import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      todos: [
        {
          id: "c1",
          task: "Test",
          date: "Test",
          done: false,
        },
        {
          id: "c2",
          task: "Test2",
          date: "Test2",
          done: false,
        },
      ],
      currentFilter: "all",
    };
  },
  mutations: {
    toggleDoneTask(state, todoId) {
      const todoItem = state.todos.find((todo) => todo.id === todoId);
      todoItem.done = !todoItem.done;
    },
    addTask(state, taskData) {
      state.todos.push(taskData);
    },
    deleteTask(state, taskId) {
      const deletedTask = state.todos.find((task) => task.id === taskId);
      const deletedTaskId = state.todos.indexOf(deletedTask);
      state.todos.splice(deletedTaskId, 1);
    },
    changeFilter(state, filter) {
      state.currentFilter = filter;
    },
    editTask(state, editedTaskData) {
      const currentTask = state.todos.find(
        (task) => task.id === editedTaskData.id
      );
      const indexOfCurrentTask = state.todos.indexOf(currentTask);
      state.todos[indexOfCurrentTask] = editedTaskData;
    },
  },
  actions: {
    toggleDoneTask(context, todoId) {
      context.commit("toggleDoneTask", todoId);
    },
    addTask(context, taskData) {
      context.commit("addTask", taskData);
    },
    deleteTask(context, taskId) {
      context.commit("deleteTask", taskId);
    },
    changeFilter(context, filter) {
      context.commit("changeFilter", filter);
    },
    editTask(context, editedTaskData) {
      context.commit("editTask", editedTaskData);
    },
  },
  getters: {
    todos(state) {
      if (state.currentFilter === "active")
        return state.todos.filter((todo) => !todo.done);
      else if (state.currentFilter === "completed")
        return state.todos.filter((todo) => todo.done);
      return state.todos;
    },
  },
});

export default store;
