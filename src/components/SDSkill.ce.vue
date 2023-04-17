<script lang="ts" setup>
import SkillCheckCircle from "@/components/SkillCheckCircle.vue";
import { computed, onMounted, ref, watch } from "vue";
import Skill from "@/utils/Skill";
import IconChevron from "@/components/icons/IconChevron.vue";

const props = defineProps<{
  verifiedColor?: string;
  skill?: Skill;
  uid?: number;
  externalCssUrl?: string;
  expandable?: boolean;
  detailed?: boolean;
}>();

const skillRef = ref<Skill>(props.skill || new Skill(props.uid || 0));

const isExpanded = computed(() => {
  return expanded.value || props.detailed;
});

onMounted(async () => {
  if (!props.skill) {
    await skillRef.value.fetch();
  }

  watch(
    isExpanded,
    (value) => {
      if (value) {
        skillRef.value.fetch();
      }
    },
    { immediate: true }
  );
});

const emit = defineEmits(["toggleVerify"]);
function toggleVerify() {
  if (!props.skill) {
    skillRef.value.progress.self = skillRef.value.progress.self === 0 ? 2 : 0;
  }
  emit("toggleVerify", skillRef.value.uid);
}

const expanded = ref(false);
</script>
<template>
  <div
    class="sd-skill transition-all duration-500 bg-white font-sans"
    :class="{ 'sd-skill-verified': skillRef.isVerified() }"
  >
    <link rel="stylesheet" :href="externalCssUrl" />
    <div class="flex items-center gap-4 justify-between mx-2">
      <div class="truncate flex gap-2 items-center">
        <button
          type="button"
          v-if="expandable"
          class="flex items-center justify-center w-8 h-8 p-2 rounded-full hover:bg-gray-200 focus:outline-none transition-all duration-500"
          @click="expanded = !expanded"
        >
          <IconChevron
            class="w-full h-full transform transition-[transform] duration-300"
            :class="{ 'rotate-180': expanded }"
          />
        </button>
        <span class="text-lg font-bold test sd-skill-title">{{
          skillRef.title
        }}</span>
      </div>
      <div>
        <SkillCheckCircle
          :verified="skillRef.isVerified()"
          :verifiedColor="verifiedColor"
          @clicked="toggleVerify"
          :class="{ 'animation-check': skillRef.isVerified() }"
        />
      </div>
    </div>
    <div
      class="overflow-y-auto"
      :class="[
        expanded ? 'max-h-[22rem]' : 'max-h-0',
        'transition-all duration-500',
      ]"
    >
      <hr class="my-2" />
      <div
        class="p-4 py-2 text-sm text-gray-500 sd-skill-description"
        v-html="skillRef.description"
      />
    </div>
  </div>
</template>

<style scoped>
@import url("../style.css");

p {
  margin: 0;
}
</style>
