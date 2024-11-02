<script setup lang="ts">
import type { Timer } from "~/models/Timer";
import { isConvertibleToInt } from "~/util/strconv";
import { DialogClose } from "~/components/ui/dialog";

const timers = useLocalStorage<Timer[]>("timers", [], {
  serializer: {
    read(v: any) {
      if (!v) {
        return [];
      }
      const tempArray = JSON.parse(v);
      for (const tempVar of tempArray) {
        if (tempVar.endDate) {
          tempVar.endDate = new Date(tempVar.endDate.toString());
        }
      }
      return tempArray;
    },
    write(v: any) {
      return JSON.stringify(v);
    },
  },
});

const now = useNow({
  interval: 1000 / 30,
});
function deleteTimer(t: Timer) {
  timers.value = timers.value.filter((el) => el !== t);
}

function addTimer() {
  const newTimer: Timer = {
    lengthMsecs: newTimerMsecs.value,
    name: newTimerTitle.value,
    endDate: new Date(new Date().getTime() + newTimerMsecs.value),
  };
  timers.value = [newTimer, ...timers.value];
  newTimerSeconds.value = 0;
  newTimerMinutes.value = 10;
  newTimerHours.value = 0;
  newTimerTitle.value = "New timer";
}

const newTimerSeconds = ref<number>(0);
const newTimerMinutes = ref<number>(10);
const newTimerHours = ref<number>(0);
const newTimerTitle = ref<string>("New timer");

const newTimerMsecs = computed(
  () =>
    newTimerHours.value * 60 * 60 * 1000 +
    newTimerMinutes.value * 60 * 1000 +
    newTimerSeconds.value * 1000
);

function refreshInput(e: Event, val: any) {
  (e.target as HTMLInputElement).value = val;
}

watch(newTimerHours, (newVal) => {
  if (!isConvertibleToInt(newVal.toString())) {
    newTimerHours.value = 0;
    return;
  }
  newTimerHours.value = Math.max(0, newVal);
});

watch(newTimerMinutes, (newVal) => {
  if (!isConvertibleToInt(newVal.toString())) {
    newTimerMinutes.value = 0;
    return;
  }
  newTimerMinutes.value = Math.max(0, Math.min(59, newVal));
});

watch(newTimerSeconds, (newVal) => {
  if (!isConvertibleToInt(newVal.toString())) {
    newTimerSeconds.value = 0;
    return;
  }
  newTimerSeconds.value = Math.max(0, Math.min(59, newVal));
});
</script>
<template>
  <div class="flex flex-col gap-4">
    <Dialog>
      <DialogTrigger as-child>
        <Button class="w-fit"><Icon name="mdi:add" /></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle> New timer </DialogTitle>
        <Input v-model="newTimerTitle" />
        <div class="flex flex-row gap-2 items-baseline">
          <Input
            @input="(e: Event) => refreshInput(e, newTimerHours)"
            v-model="newTimerHours"
          />:
          <Input
            @input="(e: Event) => refreshInput(e, newTimerMinutes)"
            v-model="newTimerMinutes"
          />:
          <Input
            @input="(e: Event) => refreshInput(e, newTimerSeconds)"
            v-model="newTimerSeconds"
          />
        </div>
        <DialogClose as-child>
          <Button @click="addTimer()">ADD</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
    <div v-for="(_, id) of timers">
      <TimerElement :now="now" @delete="deleteTimer" v-model="timers[id]" />
    </div>
  </div>
</template>
