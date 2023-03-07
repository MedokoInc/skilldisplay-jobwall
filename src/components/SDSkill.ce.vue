<script lang="ts" setup>
import SkillCheckCircle from "@/components/SkillCheckCircle.vue";
import { inject, onMounted, provide, ref } from "vue";
import Skill from "@/utils/Skill";

const props = defineProps<{
  verifiedColor?: string;
  skill?: Skill;
  uid?: number;
}>();

const skillRef = ref<Skill>(
  props.skill || new Skill(props.uid || 0, "test", 0)
);

onMounted(async () => {
  if (!props.skill) {
    await skillRef.value.fetch();
  }
});

const verifiedColorRef = inject("verifiedColor", props.verifiedColor);
provide("verifiedColor", verifiedColorRef);

const emit = defineEmits<{
  (e: "toggleVerify", uid: number): void;
}>();

function toggleVerify() {
  if (!props.skill) {
    skillRef.value.skill.progress.self =
      skillRef.value.skill.progress.self === 0 ? 2 : 0;
  }
  emit("toggleVerify", skillRef.value.skill.uid);
}
</script>
<template>
  <div class="flex items-center gap-4 justify-between">
    <div class="truncate">
      <span class="text-lg font-bold">{{ skillRef.skill.title }}</span>
    </div>
    <div>
      <SkillCheckCircle
        :verified="skillRef.isVerified()"
        @clicked="toggleVerify"
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
