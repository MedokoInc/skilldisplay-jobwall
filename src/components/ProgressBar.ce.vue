<script setup lang="ts">
defineProps<{
  progress: number;
  externalCssUrl?: string;
}>();
</script>
<template>
  <link rel="stylesheet" :href="externalCssUrl" />
  <div class="h-2 rounded-full flex bg-gray-200" v-bind="$attrs">
    <div
      class="h-full rounded-full progress transition-[width] duration-500 sd-progress"
      :style="{ width: `${progress}%` }"
      :class="[
        { 'sd-progress-20': progress > 20 },
        { 'sd-progress-40': progress > 40 },
        { 'sd-progress-60': progress > 60 },
        { 'sd-progress-80': progress > 80 },
        { 'sd-progress-100': progress > 100 },
      ]"
    ></div>
  </div>
</template>

<style scoped>
@import url("../style.css");

.progress {
  @apply rounded-full;
}
</style>
