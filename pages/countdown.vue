<script setup lang="ts">
import Dialog from "~/components/ui/dialog/Dialog.vue";
import DialogTrigger from "~/components/ui/dialog/DialogTrigger.vue";
import DialogContent from "~/components/ui/dialog/DialogContent.vue";

const searchParams = useUrlSearchParams("history");

const embedMode = computed(() => searchParams.embed === "true");
watchEffect(() =>
  setPageLayout(embedMode.value === true ? "embed" : "default")
);

// Setup defaults if query params are missing
if (!searchParams.title) {
  searchParams.title = "the time you opened this tool";
}
if (!searchParams.date) {
  const nowDate = new Date();
  searchParams.date = nowDate.toISOString();
}

const { title } = toRefs(searchParams) as {
  title: Ref<string>;
};
const date = computed({
  get() {
    return new Date(searchParams.date as string);
  },
  set(date: Date) {
    searchParams.date = date.toISOString();
  },
});
const { dateString, timeString } = useSplitDateAndTime(date);

const now = useNow({
  interval: 1000 / 30,
});
const dateDiff = computed(
  () => (now.value.getTime() - date.value.getTime()) / 1000
);
const dateDiffParts = computed(() => {
  const diff = dateDiff.value;
  return {
    days: Math.trunc(diff / 60 / 60 / 24),
    hours: Math.trunc((diff / 60 / 60) % 24),
    minutes: Math.trunc((diff / 60) % 60),
    seconds: Math.trunc(diff % 60),
  };
});
const dateDiffPartsFormatted = computed(() => {
  const fmt = (num: number) => String(Math.abs(num)).padStart(2, "0");
  return (
    fmt(dateDiffParts.value.days) +
    ":" +
    fmt(dateDiffParts.value.hours) +
    ":" +
    fmt(dateDiffParts.value.minutes) +
    ":" +
    fmt(dateDiffParts.value.seconds)
  );
});
</script>

<template>
  <div class="h-full flex flex-col items-center justify-center gap-2">
    <Dialog>
      <DialogTrigger as-child>
        <span class="text-6xl mb-8 cursor-pointer">
          {{ dateDiffPartsFormatted }}
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Set time</DialogTitle>
        <Input
          v-model="dateString"
          @click="(e: any) => e.target.showPicker()"
          type="date"
        />
        <Input
          v-model="timeString"
          @click="(e: any) => e.target.showPicker()"
          type="time"
        />
      </DialogContent>
    </Dialog>
    <EditableDiv
      placeholder="click here to set event title"
      v-model="title"
    ></EditableDiv>
  </div>
</template>

<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
  display: none;
  -webkit-appearance: none;
}

input[type="date"] {
  -moz-appearance: textfield; /* Removes the native date picker icon */
  appearance: none;
}

input[type="time"]::-webkit-calendar-picker-indicator {
  display: none;
  -webkit-appearance: none;
}

input[type="time"] {
  -moz-appearance: textfield; /* Removes the native date picker icon */
  appearance: none;
}
</style>
