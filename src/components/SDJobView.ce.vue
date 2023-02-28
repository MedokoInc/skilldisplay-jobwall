<script lang="ts" setup>
import { inject, provide, ref } from "vue";

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
});

provide("verifiedColor", props.verifiedColor || inject("verifiedColor"));
</script>
<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-2xl font-bold">{{ mockJob.title }}</h1>
    <div class="description" v-html="mockJob.description"></div>
    <sd-skill-set />
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
