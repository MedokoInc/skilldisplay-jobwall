<script lang="ts" setup>
import ProgressBar from "@/components/ProgressBar.ce.vue";

function myFunction() {
  console.log("myFunction");
}
</script>

<template>
  <main class="flex flex-col items-center">
    <div class="max-w-[800px] w-full">
      <ProgressBar :progress="50" />
      <div class="h-[800px]">
        <sd-job-view
          id="testJob"
          class="h-full"
          skills-detailed
          external-css-url="ext.css"
          uid="654"
          @jobSubmit="myFunction"
        ></sd-job-view>
      </div>

      <!--      <hr class="my-4" />-->

      <!--      <h1>Beispiel von Skills als Standalone</h1>-->
      <!--      <sd-skill-->
      <!--        uid="4"-->
      <!--        verified-color="#ff0000"-->
      <!--        external-css-url="ext.css"-->
      <!--      ></sd-skill>-->
      <!--      <sd-skill uid="6"></sd-skill>-->
    </div>
  </main>
</template>

<style scoped>
@import url("style.css");
</style>
