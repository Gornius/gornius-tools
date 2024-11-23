<script setup lang="ts">
import type { LapListRecord } from "~/models/LapListRecord";
import { timeLengthMsecToString } from "~/util/strconv";
const now = useNow();
const startedDate = ref<Date>();
const pausedTime = ref<number>(0);
const isRunning = computed(() => startedDate.value !== undefined);
const timeElapsed = computed(() => {
  if (!startedDate.value) {
    return pausedTime.value;
  }
  return now.value.getTime() - startedDate.value.getTime() + pausedTime.value;
});

const laps = ref<LapListRecord[]>([]);

function onLap() {
  laps.value.push({
    title: (laps.value.length + 1).toString(),
    time: timeElapsed.value,
  });
}

function onStartStop() {
  if (isRunning.value) {
    pausedTime.value = timeElapsed.value;
    startedDate.value = undefined;
    return;
  }
  startedDate.value = now.value;
}
function onReset() {
  pausedTime.value = 0;
  startedDate.value = undefined;
  laps.value = [];
}
</script>

<template>
  <div class="flex h-full justify-center items-center">
    <div class="flex flex-col gap-2 w-fit items-center">
      <div class="text-6xl">
        {{ timeLengthMsecToString(timeElapsed, { withMsec: true }) }}
      </div>
      <div class="flex flex-row gap-2 w-full min-w-72">
        <Button @click="onStartStop()" class="flex-grow basis-1">{{
          isRunning ? "Pause" : "Start"
        }}</Button>
        <Button
          @click="isRunning ? onLap() : onReset()"
          :variant="isRunning ? 'outline' : 'destructive'"
          class="flex-grow basis-1"
          >{{ isRunning ? "Lap" : "Reset" }}</Button
        >
      </div>
      <LapList v-model="laps" />
    </div>
  </div>
</template>
