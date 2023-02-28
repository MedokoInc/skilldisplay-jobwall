<script lang="ts" setup>
import SkillCheckCircle from "@/components/SkillCheckCircle.vue";
import { inject, provide, ref } from "vue";

const props = defineProps<{
  verifiedColor?: string;
  skill?: any;
}>();

provide("verifiedColor", props.verifiedColor || inject("verifiedColor"));

const mockSkill = ref<any>({
  name: "HTML & CSS Kenntnisse Das ist ein sehr langer Name den ich hier reinschreiben muss um zu sehen wie das aussehen wird",
  level: 5,
  link: "https://vuejs.org/",
  verified: false,
});
</script>
<template>
  <div class="flex items-center gap-4 justify-between">
    <div class="truncate">
      <span class="text-lg font-bold">{{ skill?.name || mockSkill.name }}</span>
    </div>
    <div>
      <SkillCheckCircle v-model="mockSkill.verified" />
    </div>
  </div>
</template>

<style scoped>
@import url("../style.css");

div {
  @apply font-sans;
}
</style>
