<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import gsap from "gsap";
import Job from "@/utils/Job";
import type Skill from "@/utils/Skill";
import ProgressBar from "@/components/ProgressBar.ce.vue";

defineProps<{
  verifiedColor?: string;
  externalCssUrl?: string;
  uid?: number;
}>();

const job = ref<Job>(new Job(654));
const skills = ref<Skill[]>([]);

onMounted(async () => {
  await job.value.fetch();
  skills.value = job.value.skills;

  console.log(job.value.brand);
  console.log(job.value.skills[0]);
});

const totalSkills = computed(() => skills.value.length);
const totalVerified = computed(
  () => skills.value.filter((s) => s.isVerified()).length
);

const progress = computed(
  () => (totalVerified.value / totalSkills.value) * 100
);

function toggleVerify(customEvent: any) {
  const skillId = customEvent.detail[0];
  // find skill by id and toggle verified
  const skill = skills.value.find((s: any) => s.uid === skillId);
  if (!skill) return;

  skill.progress.self = skill.progress.self === 0 ? 2 : 0;
}

const emit = defineEmits(["jobSubmit"]);

async function submit() {
  console.log("submit");
  emit("jobSubmit", skills.value);
}

const orderedSkills = computed(() => {
  const skillCopy = [...skills.value];
  return skillCopy.sort((a, b) => {
    if (a.uid < b.uid) return -1;
    if (a.uid > b.uid) return 1;
    return 0;
  });
});

const verifiedSkills = computed(() => {
  return orderedSkills.value.filter((s) => s.isVerified());
});

const unverifiedSkills = computed(() => {
  return orderedSkills.value.filter((s) => !s.isVerified());
});

function beforeSkillLeave(el: any) {
  // set the height of the element to its current height and the width to its current width
  el.style.height = el.offsetHeight + "px";
  el.style.width = el.offsetWidth + "px";
}

function onSkillLeave(el: any, done: any) {
  // insert an invisible element with the same height as the element in its place
  const placeholder = document.createElement("div");
  placeholder.style.height = el.offsetHeight + "px";
  // give the placeholder negative margin to offset the gap of the flexbox
  el.parentNode.insertBefore(placeholder, el);

  gsap.to(el, {
    duration: 0.6,
    translateY: -120,
    opacity: 0,
    delay: 1,
    onComplete: () => {
      // slowly shrink the height of the placeholder to 0
      placeholder.style.marginBottom = "-0.25rem";
      placeholder.style.marginTop = "-0.25rem";
      gsap.to(placeholder, {
        duration: 0.6,
        height: 0,
        onComplete: () => {
          // remove the placeholder
          placeholder.remove();
          done();
        },
      });
    },
  });
}
</script>
<template>
  <link :href="externalCssUrl" rel="stylesheet" />
  <form
    class="flex flex-col gap-4 font-sans"
    v-bind="$attrs"
    @submit.prevent="submit"
  >
    <div class="flex flex-col gap-y-4 px-12">
      <h1 class="text-2xl font-bold">{{ job.name }}</h1>
      <div class="description" v-html="job.description"></div>
      <div class="flex gap-4">
        <span class="text-sm font-bold">Total : {{ totalSkills }}</span>
        <span class="text-sm font-bold ml-4">
          Verified : {{ totalVerified }}
        </span>
      </div>
      <progress-bar :external-css-url="externalCssUrl" :progress="progress" />
      <button
        :class="[
          { 'sd-submit-progress-40': progress >= 40 },
          { 'sd-submit-progress-60': progress >= 60 },
          { 'sd-submit-progress-80': progress >= 80 },
          { 'sd-submit-progress-100': progress >= 100 },
        ]"
        class="sd-submit sticky bottom-0"
        type="submit"
      >
        Submit
      </button>
    </div>
    <div class="flex-1 flex flex-col gap-y-2 overflow-y-auto">
      <TransitionGroup
        appear
        class="sd-skills flex flex-col gap-y-2 px-12"
        name="list"
        tag="div"
        @leave="onSkillLeave"
        @before-leave="beforeSkillLeave"
      >
        <div v-for="skill in unverifiedSkills" :key="skill.uid">
          <sd-skill
            :external-css-url="externalCssUrl"
            :skill="skill"
            :verifiedColor="verifiedColor"
            class="w-full"
            @toggleVerify="toggleVerify"
          />
        </div>
      </TransitionGroup>
      <TransitionGroup
        appear
        class="sd-skills flex flex-col gap-y-2 px-12"
        name="verified"
        tag="div"
      >
        <div v-for="skill in verifiedSkills" :key="skill.skill.uid">
          <sd-skill
            :external-css-url="externalCssUrl"
            :skill="skill"
            :verifiedColor="verifiedColor"
            @toggleVerify="toggleVerify"
          />
        </div>
      </TransitionGroup>
    </div>
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

.list-move /* apply transition to moving elements */ {
  transition: all 0.5s ease;
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}

.verified-move,
.verified-enter-active,
.verified-leave-active {
  transition: all 0.5s ease;
}

.verified-enter-from {
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.5s ease;
  transition-delay: 1s;
}

.verified-leave-to {
  opacity: 0;
}
</style>
