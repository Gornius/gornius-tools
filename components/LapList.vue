<script setup lang="ts">
import type { LapListRecord } from "~/models/LapListRecord";
import { timeLengthMsecToString } from "~/util/strconv";

const model = defineModel<LapListRecord[]>({
  required: true,
});

const containerDiv = ref<HTMLDivElement>();

function scrollToBottom() {
  if (!containerDiv.value) {
    return;
  }
  containerDiv.value.scrollTop = containerDiv.value.scrollHeight;
}

watch(model.value, async () => {
  await nextTick();
  scrollToBottom();
});
</script>
<template>
  <div
    ref="containerDiv"
    class="flex flex-col h-36 overflow-y-auto overflow-x-hidden w-full rounded-sm border border-input"
  >
    <div
      v-for="lap of model"
      :key="lap.title"
      class="py-1 px-2 flex flex-row odd:bg-input"
    >
      <div>
        {{ lap.title }}
      </div>
      <div class="flex-grow"></div>
      <div>
        {{ timeLengthMsecToString(lap.time, { withMsec: true }) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
div::-webkit-scrollbar {
  background: transparent;
  width: 0.5rem;
}

div::-webkit-scrollbar-track {
  background: transparent;
}

div::-webkit-scrollbar-thumb {
  background: hsl(var(--input));
  border-radius: 0.5rem;
}
</style>
