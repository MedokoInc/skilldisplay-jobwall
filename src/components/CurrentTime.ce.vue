<script lang="ts" setup>
import { ref } from "vue";

const currentTime = ref(new Date().toLocaleTimeString());

setInterval(() => {
  currentTime.value = new Date().toLocaleTimeString();
}, 1000);
</script>
<template>
  <div class="bg-blue-200 p-4">
    <p>{{ currentTime }}</p>
  </div>
</template>

<style scoped></style>
