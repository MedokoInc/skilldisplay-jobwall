<script lang="ts" setup></script>

<template>
  <main class="flex flex-col items-center">
    <div class="max-w-[600px] w-full">
      <h1>Beispiel eines Jobangebots</h1>
      <!--      <sd-job-view></sd-job-view>-->

      <hr class="my-4" />

      <h1>Beispiel von Skills als Standalone</h1>
      <sd-skill
        uid="4"
        verified-color="#ff0000"
        external-css-url="ext.css"
      ></sd-skill>
      <sd-skill uid="6"></sd-skill>
    </div>
  </main>
</template>

<style scoped>
@import url("style.css");
</style>
