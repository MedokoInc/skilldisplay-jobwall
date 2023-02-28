<script lang="ts" setup>
import { inject, provide, ref } from "vue";

const props = defineProps<{
  verifiedColor?: string;
}>();

provide("verifiedColor", props.verifiedColor || inject("verifiedColor"));

// array of skill objects with a name, and verified property
const mockSkillSet = ref<any[]>([
  {
    name: "HTML & CSS Kenntnisse",
    level: 5,
    link: "https://vuejs.org/",
    verified: false,
  },
  {
    name: "JavaScript Kenntnisse",
    level: 5,
    link: "https://vuejs.org/",
    verified: false,
  },
  {
    name: "Vue Kenntnisse",
    level: 5,
    link: "https://vuejs.org/",
    verified: false,
  },
  {
    name: "React Kenntnisse",
    level: 5,
    link: "https://vuejs.org/",
    verified: false,
  },
  {
    name: "Angular Kenntnisse",
    level: 5,
    link: "https://vuejs.org/",
    verified: false,
  },
  {
    name: "Svelte Kenntnisse",
    level: 5,
    link: "https://vuejs.org/",
    verified: false,
  },
  {
    name: "Node Kenntnisse",
    level: 5,
    link: "https://vuejs.org/",
    verified: false,
  },
  {
    name: "Express Kenntnisse",
    level: 5,
    link: "https://vuejs.org/",
    verified: false,
  },
  {
    name: "MongoDB Kenntnisse",
    level: 5,
    link: "https://vuejs.org/",
    verified: false,
  },
  {
    name: "MySQL Kenntnisse",
    level: 5,
    link: "https://vuejs.org/",
    verified: false,
  },
  {
    name: "PostgreSQL Kenntnisse",
    level: 5,
    link: "https://vuejs.org/",
    verified: false,
  },
  {
    name: "GraphQL Kenntnisse",
    level: 5,
    link: "https://vuejs.org/",
    verified: false,
  },
  {
    name: "REST Kenntnisse",
    level: 5,
    link: "https://vuejs.org/",
    verified: false,
  },
  {
    name: "Git Kenntnisse",
    level: 5,
    link: "https://vuejs.org/",
    verified: false,
  },
]);
</script>
<template>
  <div class="flex flex-col gap-4">
    <sd-skill v-for="skill in mockSkillSet" :key="skill.name" :skill="skill" />
  </div>
</template>

<style scoped>
@import url("../style.css");

div {
  @apply font-sans;
}
</style>
