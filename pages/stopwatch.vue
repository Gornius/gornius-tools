<script setup lang="ts">
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
const timeElapsedFormatted = computed(() => {
  const t = timeElapsed.value;
  const hours = Math.trunc(t / 1000 / 60 / 60)
    .toString()
    .padStart(2, "0");
  const minutes = Math.trunc((t / 1000 / 60) % 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.trunc((t / 1000) % 60)
    .toString()
    .padStart(2, "0");
  const miliSeconds = Math.trunc(t % 1000)
    .toString()
    .padStart(3, "0");
  return `${hours}:${minutes}:${seconds}.${miliSeconds}`;
});
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
  startedDate.value = now.value;
}
</script>

<template>
  <div class="flex h-full justify-center items-center">
    <div class="flex flex-col gap-2 w-fit items-center">
      <div class="text-6xl">{{ timeElapsedFormatted }}</div>
      <div class="flex flex-row gap-2 w-full min-w-72">
        <Button @click="onStartStop()" class="flex-grow basis-1">{{
          isRunning ? "Pause" : "Start"
        }}</Button>
        <Button
          @click="onReset()"
          variant="destructive"
          class="flex-grow basis-1"
          >Reset</Button
        >
      </div>
    </div>
  </div>
</template>
