<script lang="ts" setup>
import { computed, provide, ref } from "vue";

const props = defineProps<{
  verifiedColor?: string;
}>();

// mockjob with title, description as html markup
const mockJob = ref<any>({
  title: "Frontend Developer",
  description: `
    <h2>Job Description</h2>
    <p>
      Lorem ipsum <b>dolor</b> sit amet, consectetur adipiscing elit. Sed
      euismod, nisl vel tincidunt lacinia, nunc nisl aliquet nisl, et
      aliquet nunc nisl eget nunc. Sed euismod, nisl vel tincidunt
      lacinia, nunc nisl aliquet nisl, et aliquet nunc nisl eget nunc.
      Sed euismod, nisl vel tincidunt lacinia, nunc nisl aliquet nisl,
      et aliquet nunc nisl eget nunc. Sed euismod, nisl vel tincidunt
      lacinia, nunc nisl aliquet nisl, et aliquet nunc nisl eget nunc.
      Sed euismod, nisl vel tincidunt lacinia, nunc nisl aliquet nisl,
      et aliquet nunc nisl eget nunc. Sed euismod, nisl vel tincidunt
      lacinia, nunc nisl aliquet nisl, et aliquet nunc nisl eget nunc.
      Sed euismod, nisl vel tincidunt lacinia, nunc nisl aliquet nisl,
      </p>
      <p>et aliquet nunc nisl eget nunc. Sed euismod, nisl vel tincidunt
      lacinia, nunc nisl aliquet nisl, et aliquet nunc nisl eget nunc.
      Sed euismod, nisl vel tincidunt lacinia, nunc nisl aliquet nisl,
      et aliquet nunc nisl eget nunc. Sed euismod, nisl vel tincidunt
      lacinia, nunc nisl aliquet nisl, et aliquet nunc nisl eget nunc.
      Sed euismod, nisl vel tincidunt lacinia, nunc nisl aliquet nisl,
      et aliquet nunc nisl eget nunc. Sed euismod, nisl vel tincidunt
      lacinia, nunc nisl aliquet nisl, et aliquet nunc nisl eget nunc.
      Sed euismod, nisl vel tincidunt lacinia, nunc nisl aliquet nisl
    </p>
    `,
  skills: [
    {
      id: 1,
      name: "HTML & CSS Kenntnisse",
      level: 5,
      link: "https://vuejs.org/",
      verified: false,
    },
    {
      id: 2,
      name: "JavaScript Kenntnisse",
      level: 5,
      link: "https://vuejs.org/",
      verified: false,
    },
    {
      id: 3,
      name: "Vue Kenntnisse",
      level: 5,
      link: "https://vuejs.org/",
      verified: false,
    },
    {
      id: 4,
      name: "React Kenntnisse",
      level: 5,
      link: "https://vuejs.org/",
      verified: false,
    },
    {
      id: 5,
      name: "Angular Kenntnisse",
      level: 5,
      link: "https://vuejs.org/",
      verified: false,
    },
    {
      id: 6,
      name: "Svelte Kenntnisse",
      level: 5,
      link: "https://vuejs.org/",
      verified: false,
    },
    {
      id: 7,
      name: "Nuxt Kenntnisse",
      level: 5,
      link: "https://vuejs.org/",
      verified: false,
    },
    {
      id: 8,
      name: "Vue Router Kenntnisse",
      level: 5,
      link: "https://vuejs.org/",
      verified: false,
    },
    {
      id: 9,
      name: "Vuex Kenntnisse",
      level: 5,
      link: "https://vuejs.org/",
      verified: false,
    },
    {
      id: 10,
      name: "Vue CLI Kenntnisse",
      level: 5,
      link: "https://vuejs.org/",
      verified: false,
    },
    {
      id: 11,
      name: "Vue Test Utils Kenntnisse",
      level: 5,
      link: "https://vuejs.org/",
      verified: false,
    },
    {
      id: 12,
      name: "Vue Router Kenntnisse",
      level: 5,
      link: "https://vuejs.org/",
      verified: false,
    },
    {
      id: 13,
      name: "Vuex Kenntnisse",
      level: 5,
      link: "https://vuejs.org/",
      verified: false,
    },
  ],
});

const shaking = ref(false);

const totalSkills = computed(() => mockJob.value.skills.length);
const totalVerified = computed(
  () => mockJob.value.skills.filter((s: any) => s.verified).length
);

const shakeAmountPx = computed(() => {
  return (totalVerified.value / totalSkills.value) * 100;
});

function toggleVerify(customEvent: any) {
  const skillId = customEvent.detail[0];
  console.log("toggleVerify", skillId);
  // find skill by id and toggle verified
  const skill = mockJob.value.skills.find((s: any) => s.id === skillId);
  skill.verified = !skill.verified;
  shaking.value = true;
}

provide("verifiedColor", props.verifiedColor);
</script>
<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-2xl font-bold">{{ mockJob.title }}</h1>
    <div class="description" v-html="mockJob.description"></div>
    <div class="flex gap-4">
      <span class="text-sm font-bold">Total : {{ totalSkills }}</span>
      <span class="text-sm font-bold ml-4">
        Verified : {{ totalVerified }}
      </span>
    </div>
    <sd-skill
      v-for="skill in mockJob.skills"
      :key="skill.name"
      :skill="skill"
      @toggle-verify="toggleVerify"
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
