<script lang="ts" setup>
import SkillCheckCircle from "@/components/SkillCheckCircle.vue";
import { onMounted, ref } from "vue";
import Skill from "@/utils/Skill";

const props = defineProps<{
  verifiedColor?: string;
  skill?: Skill;
  uid?: number;
  externalCssUrl?: string;
}>();

const skillRef = ref<Skill>(props.skill || new Skill(props.uid || 0));

onMounted(async () => {
  if (!props.skill) {
    await skillRef.value.fetch();
  }
});

const emit = defineEmits(["toggleVerify"]);
function toggleVerify() {
  if (!props.skill) {
    skillRef.value.progress.self =
      skillRef.value.progress.self === 0 ? 2 : 0;
  }
  emit("toggleVerify", skillRef.value.uid);
}
</script>
<template>
  <div
    class="flex items-center gap-4 justify-between sd-skill transition-all duration-500 bg-white"
    :class="{ 'sd-skill-verified': skillRef.isVerified() }"
  >
    <link rel="stylesheet" :href="externalCssUrl" />
    <div class="truncate">
      <span class="text-lg font-bold test">{{ skillRef.title }}</span>
      {{ verifiedColor }}
    </div>
    <div>
      <SkillCheckCircle
        :verified="skillRef.isVerified()"
        :verifiedColor="verifiedColor"
        @clicked="toggleVerify"
        :class="{ 'animation-check': skillRef.isVerified() }"
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
