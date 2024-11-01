<script setup lang="ts">
import type { Timer } from "~/models/Timer";

const model = defineModel<Timer>({
  required: true,
});
const paused = computed(() => model.value.endDate === undefined);
</script>
<template>
  <div
    class="w-full rounded-md bg-secondary p-2 flex flex-row items-center justify-end gap-2 border-border border pl-4"
  >
    <div class="text-lg">
      {{ model?.name }}
    </div>
    <div class="flex-grow"></div>
    <Button class="rounded-full aspect-square p-0 text-2xl"
      ><Icon :name="paused ? 'mdi:play' : 'mdi:pause'"></Icon
    ></Button>
    <Button
      variant="destructive"
      class="rounded-full aspect-square p-0 text-2xl"
    >
      <Icon name="mdi:delete"></Icon>
    </Button>
    <div class="bg-background p-3 rounded-md text-lg border border-border">
      00:00:00
    </div>
  </div>
</template>
