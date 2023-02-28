<script lang="ts" setup>
import { computed, inject } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const verifiedColor = inject<string | undefined>("verifiedColor");

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>
<template>
  <div
    :class="[
      'flex items-center justify-center',
      value ? 'bg-verified' : 'border-gray-400 border-2',
    ]"
    :style="[
      value && verifiedColor ? { 'background-color': verifiedColor } : {},
    ]"
    class="rounded-full w-10 aspect-square text-white p-1 transition-colors duration-300"
    @click="value = !value"
  >
    <svg
      v-if="value"
      class="m-2"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  </div>
</template>

<style scoped></style>
