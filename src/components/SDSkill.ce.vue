<script lang="ts" setup>
import SkillCheckCircle from "@/components/SkillCheckCircle.vue";
import { computed, inject, onMounted, provide } from "vue";
import Skill from "@/utils/Skill";

const props = defineProps<{
  verifiedColor?: string;
  skill: Skill;
}>();

provide("verifiedColor", props.verifiedColor || inject("verifiedColor"));

onMounted(() => {
  console.log(props.skill);
});

const title = computed(() => {
  return props.skill.skill.title;
});

const emit = defineEmits<{
  (e: "toggleVerify", id: number): void;
}>();
</script>
<template>
  <div class="flex items-center gap-4 justify-between">
    <div class="truncate">
      <span class="text-lg font-bold">{{ title }}</span>
    </div>
    <div>
      <SkillCheckCircle
        :verified="skill.skill.progress.self === 2"
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
