<script lang="ts" setup>
defineProps<{
  verified: boolean;
  verifiedColor?: string;
}>();

const emit = defineEmits<{
  (event: "clicked"): void;
}>();
</script>
<template>
  <div
    :class="[
      'flex items-center justify-center',
      verified ? 'bg-verified' : 'border-gray-400 border-2',
    ]"
    :style="[
      verified && verifiedColor ? { 'background-color': verifiedColor } : {},
    ]"
    class="rounded-full w-10 aspect-square text-white p-1 transition-colors duration-300"
    @click="emit('clicked')"
  >
    <svg
      v-if="verified"
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
