<script lang="ts" setup>
import SkillCheckCircle from "@/components/SkillCheckCircle.vue";
import { inject, provide } from "vue";

const props = defineProps<{
  verifiedColor?: string;
  skill: any;
}>();

provide("verifiedColor", props.verifiedColor || inject("verifiedColor"));

const emit = defineEmits<{
  (e: "toggleVerify", id: number): void;
}>();
</script>
<template>
  <div class="flex items-center gap-4 justify-between">
    <div class="truncate">
      <span class="text-lg font-bold">{{ skill?.name }}</span>
    </div>
    <div>
      <SkillCheckCircle
        :verified="skill?.verified"
        @clicked="emit('toggleVerify', skill?.id)"
      />
    </div>
  </div>
</template>

<style scoped>
@import url("../style.css");

div {
  @apply font-sans;
}
</style>
