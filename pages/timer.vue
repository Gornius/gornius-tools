<script setup lang="ts">
import type { Timer } from "~/models/Timer";

const timers = ref<Timer[]>([
  { lengthSeconds: 600, name: "TEST", endDate: new Date() },
  { lengthSeconds: 600, name: "TEST2" },
]);
</script>
<template>
  <div class="flex flex-col gap-4">
    <div v-for="(timer, id) of timers">
      <TimerElement v-model="timers[id]" />
    </div>
  </div>
</template>
