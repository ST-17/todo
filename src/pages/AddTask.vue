<template>
  <router-link to="/todos">
    <base-button class="gray">Go Back</base-button>
  </router-link>
  <base-badge>
    <form @submit.prevent="submitForm">
      <div class="item">
        <label :class="{ error: !taskValid }">Task</label>
        <textarea type="text" v-model="task" @input="setValid" />
        <p v-show="!taskValid">Please write task!</p>
      </div>
      <div class="item">
        <label :class="{ error: !dateValid }">Deadline</label>
        <input type="datetime-local" v-model="date" @input="setValid" />
        <p v-show="!dateValid">Please write deadline!</p>
      </div>
      <base-button>Add Task</base-button>
    </form>
  </base-badge>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const task = ref("");
const date = ref("");
const router = useRouter();
const store = useStore();
const taskValid = ref(true);
const dateValid = ref(true);

function submitForm() {
  if (task.value === "" || date.value === "") {
    if (task.value === "") taskValid.value = false;
    if (date.value === "") dateValid.value = false;
    return;
  }
  let dateFormat = date.value.replace("T", " ");
  dateFormat = dateFormat.replaceAll("-", ".");
  const taskData = {
    id: new Date().toISOString(),
    task: task.value,
    date: dateFormat,
    done: false,
  };
  store.dispatch("addTask", taskData);
  router.push({ path: "/todos" });
}
function setValid(event) {
  if (event.target.parentNode.firstChild.innerHTML === "Task") {
    if (task.value === "") {
      taskValid.value = false;
      event.target.parentNode.firstChild.classList.add("error");
    } else {
      taskValid.value = true;
      event.target.parentNode.firstChild.classList.remove("error");
    }
  } else if (event.target.parentNode.firstChild.innerHTML === "Deadline") {
    if (date.value === "") {
      dateValid.value = false;
      event.target.parentNode.firstChild.classList.add("error");
    } else {
      dateValid.value = true;
      event.target.parentNode.firstChild.classList.remove("error");
    }
  }
  // if (date.value === "")
  //   event.target.parentNode.firstChild.classList.add("error");
  // else dateValid.value = true;
}
</script>

<style scoped>
form {
  width: 70%;
  margin: 30px auto;
  background-color: #e3e7ec;
  padding: 20px;
  border-radius: 8px;
  color: #575757;
}
label {
  font-size: 24px;
  margin-bottom: 5px;
  font-weight: 600;
}
input {
  width: 170px;
  padding: 5px;
  border-radius: 8px;
  border: none;
}
textarea {
  max-width: 100%;
  min-width: 100%;
  padding: 5px;
  max-height: 70px;
  min-height: 70px;
  border-radius: 8px;
  border: none;
}
.item {
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
}
.error {
  color: red;
}
p {
  margin: 5px 0;
}
.gray {
  background-color: rgb(164, 161, 161);
  margin-bottom: 10px;
}
.gray:hover {
  background-color: gray;
}
</style>
