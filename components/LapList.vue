<script setup lang="ts">
import type { LapListRecord } from "~/models/LapListRecord";
import { timeLengthMsecToString } from "~/util/strconv";

const model = defineModel<LapListRecord[]>({
  required: true,
});
</script>
<template>
  <div
    class="flex flex-col h-36 overflow-y-auto overflow-x-hidden w-full rounded-sm border border-input p-1"
  >
    <div v-for="lap of model" :key="lap.title" class="p-1 flex flex-row">
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
