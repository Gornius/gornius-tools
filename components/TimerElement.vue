<script setup lang="ts">
import type { Timer } from "~/models/Timer";

const model = defineModel<Timer>({
  required: true,
});

const emits = defineEmits<{
  (e: "delete", element: Timer): void;
}>();

const props = defineProps<{
  now: Date;
}>();

const paused = computed(() => model.value.endDate === undefined);
const timeRemainingMsecs = computed(() => {
  if (typeof model.value.endDate === "undefined") {
    return model.value.lengthMsecs;
  }
  const remainingSeconds = Math.trunc(
    model.value.endDate.getTime() - props.now.getTime()
  );
  return Math.max(remainingSeconds, 0);
});

const timeRemainingString = computed(() => {
  const fmt = (num: number) => num.toString().padStart(2, "0");
  const t = timeRemainingMsecs.value / 1000;
  const seconds = Math.trunc(t % 60);
  const minutes = Math.trunc((t / 60) % 60);
  const hours = Math.trunc(t / 60 / 60);

  return fmt(hours) + ":" + fmt(minutes) + ":" + fmt(seconds);
});

function onStartPauseClick() {
  if (paused.value === false) {
    model.value.lengthMsecs = timeRemainingMsecs.value;
    model.value.endDate = undefined;
    return;
  }

  model.value.endDate = new Date(props.now.getTime() + model.value.lengthMsecs);
}

function showAlert(
  props: {
    withSound?: boolean;
  } = { withSound: true }
) {
  model.value.timerEnded = true;
  alertOpened.value = true;
  if (props.withSound === true) {
    try {
      const audio = new Audio("/sfx/finish.mp3");
      audio.play();
    } catch (e: any) {
      // Exception is being thrown here, but everything works as should
    }
  }
}

const alertOpened = ref<boolean>(false);
watch(timeRemainingMsecs, async (val) => {
  if (val === 0 && model.value.timerEnded !== true) {
    showAlert();
  }
});

if (model.value.timerEnded !== true && timeRemainingMsecs.value === 0) {
  showAlert({ withSound: false });
}

watch(alertOpened, (to, from) => {
  if (from === true && to === false) {
    emits("delete", model.value);
  }
});
</script>
<template>
  <TimerAlert v-model="alertOpened" :title="model.name" />
  <div
    class="w-full rounded-md bg-secondary p-2 flex flex-row items-center justify-end gap-3 border-border border pl-4"
  >
    <div class="text-lg">
      {{ model?.name }}
    </div>
    <div class="flex-grow"></div>
    <Button
      class="rounded-full aspect-square p-0 text-2xl"
      @click="onStartPauseClick()"
      ><Icon :name="paused ? 'mdi:play' : 'mdi:pause'"></Icon
    ></Button>
    <Button
      variant="destructive"
      class="rounded-full aspect-square p-0 text-2xl"
      @click="emits('delete', model)"
    >
      <Icon name="mdi:delete"></Icon>
    </Button>
    <div class="bg-background p-3 rounded-md text-lg border border-border">
      {{ timeRemainingString }}
    </div>
  </div>
</template>
