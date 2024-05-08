<template>
  <li>
    <delete-modal
      v-if="deleteModalIsOpen"
      :id="props.id"
      @cancelDelete="cancel"
    ></delete-modal>
    <!-- <edit-modal></edit-modal> -->
    <div>
      <div class="info">
        <input type="checkbox" @change="toggleDone" :checked="taskIsDone" />
        <div class="text">
          <p
            class="title"
            :class="{ completed: taskIsDone }"
            v-if="!editIsActive"
          >
            {{ task }}
          </p>
          <input type="text" v-model="task" v-else />
          <p class="date" v-if="!editIsActive">{{ date }}</p>
          <input type="datetime-local" v-model="date" v-else />
        </div>
      </div>
    </div>
    <div class="buttons">
      <button class="deleteBtn" @click="deleteCurrentTask">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="-30,-35,296,296"
        >
          <g
            fill="#797979"
            fill-rule="nonzero"
            stroke="none"
            stroke-width="1"
            stroke-linecap="butt"
            stroke-linejoin="miter"
            stroke-miterlimit="10"
            stroke-dasharray=""
            stroke-dashoffset="0"
            font-family="none"
            font-weight="none"
            font-size="none"
            text-anchor="none"
            style="mix-blend-mode: normal"
          >
            <g transform="scale(7.5,7.5)">
              <path
                d="M14.98438,2.48633c-0.55152,0.00862 -0.99193,0.46214 -0.98437,1.01367v0.5h-5.5c-0.26757,-0.00363 -0.52543,0.10012 -0.71593,0.28805c-0.1905,0.18793 -0.29774,0.44436 -0.29774,0.71195h-1.48633c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h18c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587h-1.48633c0,-0.26759 -0.10724,-0.52403 -0.29774,-0.71195c-0.1905,-0.18793 -0.44836,-0.29168 -0.71593,-0.28805h-5.5v-0.5c0.0037,-0.2703 -0.10218,-0.53059 -0.29351,-0.72155c-0.19133,-0.19097 -0.45182,-0.29634 -0.72212,-0.29212zM6,9l1.79297,15.23438c0.118,1.007 0.97037,1.76563 1.98438,1.76563h10.44531c1.014,0 1.86538,-0.75862 1.98438,-1.76562l1.79297,-15.23437z"
              ></path>
            </g>
          </g>
        </svg>
      </button>
      <button class="editBtn" @click="editCurrentTask" v-if="!editIsActive">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="-35,-35,346,346"
        >
          <g
            fill="#797979"
            fill-rule="nonzero"
            stroke="none"
            stroke-width="1"
            stroke-linecap="butt"
            stroke-linejoin="miter"
            stroke-miterlimit="10"
            stroke-dasharray=""
            stroke-dashoffset="0"
            font-family="none"
            font-weight="none"
            font-size="none"
            text-anchor="none"
            style="mix-blend-mode: normal"
          >
            <g transform="scale(5.12,5.12)">
              <path
                d="M46.57422,3.42578c-0.94922,-0.94922 -2.19531,-1.42578 -3.44141,-1.42578c-1.24609,0 -2.49219,0.47656 -3.44141,1.42578c0,0 -0.07031,0.06641 -0.16016,0.16016c-0.00781,0.00781 -0.01953,0.01172 -0.02734,0.01953l-35.20312,35.19922c-0.12109,0.125 -0.21094,0.27734 -0.25781,0.44922l-2.00781,7.48828c-0.09375,0.34375 0.00391,0.71094 0.25781,0.96484c0.19141,0.19141 0.44531,0.29297 0.70703,0.29297c0.08594,0 0.17188,-0.01172 0.25781,-0.03516l7.48828,-2.00781c0.17188,-0.04687 0.32422,-0.13672 0.44922,-0.26172l35.19922,-35.19531c0.01172,-0.01172 0.01563,-0.02734 0.02344,-0.03906c0.08984,-0.08984 0.15234,-0.15234 0.15234,-0.15234c1.90625,-1.90234 1.90625,-4.98437 0.00391,-6.88281zM45.16016,4.83984c1.11719,1.11719 1.11719,2.9375 0,4.05469c-0.33203,0.32813 -0.61328,0.61328 -0.85547,0.85547l-4.05469,-4.05469c0.46094,-0.46094 0.85547,-0.85547 0.85547,-0.85547c0.53906,-0.54297 1.26172,-0.83984 2.02734,-0.83984c0.76563,0 1.48438,0.30078 2.02734,0.83984zM5.60547,41.15234l3.24219,3.24219l-4.43359,1.19141z"
              ></path>
            </g>
          </g>
        </svg>
      </button>
      <button class="saveBtn" @click="editCurrentTask" v-else>
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h48v48H0z" fill="none"></path>
          <path
            d="M18 32.34 9.66 24l-2.83 2.83L18 38l24-24-2.83-2.83z"
            fill="#575757"
            class="fill-000000"
          ></path>
        </svg>
      </button>
    </div>
  </li>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { useStore } from "vuex";
import DeleteModal from "../layout/DeleteModal.vue";

const store = useStore();
const props = defineProps(["id", "task", "date", "done"]);

const taskIsDone = ref(props.done);
const deleteModalIsOpen = ref(false);
const editIsActive = ref(false);

const task = ref(props.task);
const date = ref(props.date);

function toggleDone() {
  taskIsDone.value = !taskIsDone.value;
  store.dispatch("toggleDoneTask", props.id);
}
function deleteCurrentTask() {
  deleteModalIsOpen.value = true;
}
function editCurrentTask() {
  if (editIsActive.value) {
    let dateFormat = date.value.replace("T", " ");
    dateFormat = dateFormat.replaceAll("-", ".");
    date.value = dateFormat;

    store.dispatch("editTask", {
      id: props.id,
      task: task.value,
      date: date.value,
      done: taskIsDone.value,
    });
  }
  editIsActive.value = !editIsActive.value;
}
function cancel() {
  deleteModalIsOpen.value = false;
}
</script>

<style scoped>
li {
  display: flex;
  justify-content: space-between;
  background-color: #e3e7ec;
  padding: 15px;
  border-radius: 8px;
  align-items: center;
}
.info {
  display: flex;
  align-items: center;
}
input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 30px;
  height: 30px;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  background-color: #cacaca;
  margin-right: 10px;
}
input[type="checkbox"]:hover {
  background-color: #929292;
}
input[type="checkbox"]:checked::before {
  content: "\2714";
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  align-items: center;
  line-height: 30px;
  background-color: #007bff; /* Change background color here */
  color: #fff; /* Change checkmark color here */
  border-radius: 3px;
}
.text p {
  margin: 0;
  color: #575757;
}
.title {
  font-weight: 600;
}
.completed {
  text-decoration: line-through;
}
.date {
  font-size: 14px;
}
.buttons {
  display: flex;
  align-items: center;
}
.buttons button {
  border: none;
  cursor: pointer;
  background-color: #cacaca;
  width: 30px;
  height: 30px;
  border-radius: 3px;
}
.deleteBtn {
  margin-right: 10px;
}
.deleteBtn:hover {
  background-color: rgb(211, 115, 115);
}
.editBtn:hover {
  background-color: rgb(199, 207, 128);
}
.saveBtn {
  background-color: rgb(128, 207, 142) !important;
}
input[type="text"] {
  display: block;
  width: 170px;
  padding: 5px;
  border-radius: 8px;
  border: none;
  margin-bottom: 3px;
}
input[type="datetime-local"] {
  width: 170px;
  padding: 5px;
  border-radius: 8px;
  border: none;
}
</style>
