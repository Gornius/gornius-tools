<script setup lang="ts">
import { Input } from "~/components/ui/input";
import Textarea from "~/components/ui/textarea/Textarea.vue";

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

const now = useNow({
  interval: 1000 / 30,
});
const dateFromParams = computed(() => new Date(searchParams.date as string));
const dateDiff = computed(
  () => (now.value.getTime() - dateFromParams.value.getTime()) / 1000
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
    <span class="text-6xl mb-8">
      {{ dateDiffPartsFormatted }}
    </span>
    <EditableDiv
      placeholder="click here to set event title"
      v-model="searchParams.title as string"
    ></EditableDiv>
  </div>
</template>
