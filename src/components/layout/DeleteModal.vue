<template>
  <div class="overlay"></div>
  <section>
    <base-badge>
      <div class="modal">
        <h2>Are you sure?</h2>
        <div class="buttons">
          <base-button class="delete" @click="deleteCurrentTask"
            >Delete</base-button
          >
          <base-button class="cancel" @click="cancelDelete">Cancel</base-button>
        </div>
      </div>
    </base-badge>
  </section>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps(["id"]);
const emit = defineEmits(["cancelDelete"]);

function cancelDelete() {
  emit("cancelDelete");
}

function deleteCurrentTask() {
  store.dispatch("deleteTask", props.id);
  cancelDelete();
}
</script>

<style scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
}
section {
  z-index: 3;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.modal {
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.delete {
  background-color: rgba(255, 0, 0, 0.5);
}
.delete:hover {
  background-color: red;
}
.cancel {
  background-color: rgba(128, 128, 128, 0.5);
}
.cancel:hover {
  background-color: gray;
}
.buttons {
  width: 70%;
  display: flex;
  justify-content: space-between;
}
</style>
