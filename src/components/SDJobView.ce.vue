<script lang="ts" setup>
import {computed, provide, ref} from "vue";
import Job from "@/utils/Job";

const props = defineProps<{
  verifiedColor?: string;
}>();

const mockJob = new Job(654);
await mockJob.fetch();
const skills = mockJob.skills;
const job = mockJob.job;


const totalSkills = computed(() => skills.length);
const totalVerified = computed(
    () => skills.filter((s: any) => s.verified).length
);

const shakeAmountPx = computed(() => {
  return (totalVerified.value / totalSkills.value) * 100;
});

/*function toggleVerify(customEvent: any) {
  const skillId = customEvent.detail[0];
  console.log("toggleVerify", skillId);
  // find skill by id and toggle verified
  const skill = skills.find((s: any) => s.id === skillId);
  skill.skill.progress.self = skill.skill.progress.self%2 *2;
  shaking.value = true;
}*/

provide("verifiedColor", props.verifiedColor);
</script>
<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-2xl font-bold">{{ job.name }}</h1>
    <div class="description" v-html="job.description"></div>
    <div class="flex gap-4">
      <span class="text-sm font-bold">Total : {{ totalSkills }}</span>
      <span class="text-sm font-bold ml-4">
        Verified : {{ totalVerified }}
      </span>
    </div>
    <sd-skill
      v-for="skill in skills"
      :key="skill.description"
      :skill="skill"
      :class="{ shake: shaking }"
    ></sd-skill>
  </div>
</template>

<style scoped>
@import url("../style.css");

div {
  @apply font-sans;
}

:deep(h2) {
  @apply text-xl;
}

.shake {
  animation: screen-shake 0.5s;
}

@keyframes screen-shake {
  0% {
    transform: translate(0);
  }
  10% {
    transform: translate(v-bind('shakeAmountPx + "px"'), 0);
  }
  20% {
    transform: translate(v-bind('-shakeAmountPx + "px"'), 0);
  }
  30% {
    transform: translate(v-bind('shakeAmountPx + "px"'), 0);
  }
  40% {
    transform: translate(v-bind('-shakeAmountPx + "px"'), 0);
  }
  50% {
    transform: translate(v-bind('shakeAmountPx + "px"'), 0);
  }
  60% {
    transform: translate(v-bind('-shakeAmountPx + "px"'), 0);
  }
  70% {
    transform: translate(v-bind('shakeAmountPx + "px"'), 0);
  }
  80% {
    transform: translate(v-bind('-shakeAmountPx + "px"'), 0);
  }
  90% {
    transform: translate(v-bind('shakeAmountPx + "px"'), 0);
  }
  100% {
    transform: translate(0);
  }
}
</style>
