<script lang="ts" setup>
import { computed, onMounted, provide, ref } from "vue";
import Job from "@/utils/Job";
import Skill from "@/utils/Skill";

const props = defineProps<{
  verifiedColor?: string;
}>();

const mockJob = ref<Job>(new Job(654));
const skills = ref<Skill[]>([]);
const job = ref({});

onMounted(async () => {
  await mockJob.value.fetch();
  skills.value = mockJob.value.skills;
  job.value = mockJob;

  console.log(mockJob.value.brand);
  console.log(mockJob.value.skills[0]);
});

const totalSkills = computed(() => skills.value.length);
const totalVerified = computed(
  () => skills.value.filter((s: any) => s.verified).length
);

const shaking = ref(false);
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
      :key="skill.skill.uid"
      :class="{ shake: shaking }"
      :skill="skill"
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
</style>
