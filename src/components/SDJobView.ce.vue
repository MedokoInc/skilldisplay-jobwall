<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import Job from "@/utils/Job";
import type Skill from "@/utils/Skill";
import ProgressBar from "@/components/ProgressBar.ce.vue";

defineProps<{
  verifiedColor?: string;
  externalCssUrl?: string;
}>();

const mockJob = ref<Job>(new Job(654));
const skills = ref<Skill[]>([]);
let job = ref<Job>({});

onMounted(async () => {
  await mockJob.value.fetch();
  skills.value = mockJob.value.skills;
  job = mockJob;

  console.log(mockJob.value.brand);
  console.log(mockJob.value.skills[0]);
});

const totalSkills = computed(() => skills.value.length);
const totalVerified = computed(
  () => skills.value.filter((s) => s.isVerified()).length
);

const progress = computed(
  () => (totalVerified.value / totalSkills.value) * 100
);

const shaking = ref(false);

function toggleVerify(customEvent: any) {
  const skillId = customEvent.detail[0];
  // find skill by id and toggle verified
  const skill = skills.value.find((s: any) => s.uid === skillId);
  if (!skill) return;

  skill.progress.self = skill.progress.self === 0 ? 2 : 0;
  shaking.value = true;
}

const emit = defineEmits(["jobSubmit"]);
async function submit() {
  console.log("submit");
  emit("jobSubmit", skills.value);
}
</script>
<template>
  <link rel="stylesheet" :href="externalCssUrl" />
  <form
    class="flex flex-col gap-4 font-sans"
    @submit.prevent="submit"
    v-bind="$attrs"
  >
    <h1 class="text-2xl font-bold">{{ job.name }}</h1>
    <div class="description" v-html="job.description"></div>
    <div class="flex gap-4">
      <span class="text-sm font-bold">Total : {{ totalSkills }}</span>
      <span class="text-sm font-bold ml-4">
        Verified : {{ totalVerified }}
      </span>
    </div>
    <progress-bar :progress="progress" :external-css-url="externalCssUrl" />
    <button
      type="submit"
      class="sd-submit"
      :class="[
        { 'sd-submit-progress-40': progress >= 40 },
        { 'sd-submit-progress-60': progress >= 60 },
        { 'sd-submit-progress-80': progress >= 80 },
        { 'sd-submit-progress-100': progress >= 100 },
      ]"
    >
      Submit
    </button>
    <div class="flex-1 overflow-y-auto flex flex-col gap-y-2 p-1">
      <sd-skill
        v-for="skill in skills"
        :key="skill.uid"
        :class="{ shake: shaking }"
        :skill="skill"
        @toggleVerify="toggleVerify"
        :verifiedColor="verifiedColor"
        :external-css-url="externalCssUrl"
      ></sd-skill>
    </div>
    <hr />
  </form>
</template>

<style scoped>
@import url("../style.css");

:deep(h2) {
  @apply text-xl;
}

.sd-submit {
  @apply text-white font-bold p-4 rounded-md bg-green-500;
}
</style>
