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
        if (skillRef.value.description === "Loading...") {
          skillRef.value.fetch();
        }
      }
    },
    { immediate: true }
  );
});

const emit = defineEmits(["toggleVerify"]);

function toggleVerify() {
  if (!props.skill) {
    skillRef.value.validated = !skillRef.value.validated;
  }
  emit("toggleVerify", skillRef.value.uid);
}

const expanded = ref(false);
</script>
<template>
  <div
    :class="{ 'sd-skill-verified': skillRef.isVerified() }"
    class="sd-skill transition-all duration-500 bg-white font-sans"
  >
    <link :href="externalCssUrl" rel="stylesheet" />
    <div class="flex items-center gap-4 justify-between mx-2">
      <div class="truncate flex gap-2 items-center">
        <button
          v-if="expandable"
          class="flex items-center justify-center w-8 h-8 p-2 rounded-full hover:bg-gray-200 focus:outline-none transition-all duration-500"
          type="button"
          @click="expanded = !expanded"
        >
          <IconChevron
            :class="{ 'rotate-180': !expanded }"
            class="w-full h-full transform transition-[transform] duration-300"
          />
        </button>
        <span class="text-lg font-bold test sd-skill-title">{{
          skillRef.title
        }}</span>
      </div>
      <div>
        <SkillCheckCircle
          :class="{ 'animation-check': skillRef.isVerified() }"
          :verified="skillRef.isVerified()"
          :verifiedColor="verifiedColor"
          @clicked="toggleVerify"
        />
      </div>
    </div>
    <div
      :class="[
        isExpanded ? 'max-h-[22rem]' : 'max-h-0',
        'transition-all duration-500',
      ]"
      class="overflow-y-auto sd-skill-details"
    >
      <hr class="my-2 sd-skill-separator" />
      <div class="p-4 py-2 text-sm text-gray-500 sd-skill-details">
        <div class="sd-skill-description" v-html="skillRef.description" />
        <h2>Tags</h2>
        <div class="flex w-full gap-2 my-2 sd-skill-tags">
          <div v-if="!skillRef.tags">Loading...</div>
          <div v-else-if="!skillRef.tags.length">No tags</div>
          <div v-for="tag in skillRef.tags" :key="tag" class="tag">
            <div
              class="sd-skill-tag border-gray-400 border rounded-full flex items-center min-w-[2rem] max-w-[8rem] text-xs font-bold text-raisin/70 justify-center"
            >
              <div class="mx-2 truncate">
                {{ tag.title }}
              </div>
            </div>
          </div>
        </div>
        <a
          :href="`https://my.skilldisplay.eu/en/skill/${skillRef.uid}/0`"
          class="text-blue-500 underline mt-2"
          target="_blank"
          >Open in SkillDisplay</a
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("../style.css");

p {
  margin: 0;
}
</style>
