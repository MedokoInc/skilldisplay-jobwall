<script lang="ts" setup></script>

<template>
  <main class="flex flex-col items-center">
    <div class="max-w-[600px] w-full">
      <h1>Beispiel eines Jobangebots</h1>
      <sd-job-view></sd-job-view>

      <hr class="my-4" />

      <h1>Beispiel von Skills als Standalone</h1>
      <sd-skill uid="4" verifiedColor="#ff0000"></sd-skill>
      <sd-skill uid="6"></sd-skill>
    </div>
  </main>
</template>

<style scoped>
@import url("style.css");

h1 {
  @apply text-2xl font-bold text-green-700;
}
</style>
