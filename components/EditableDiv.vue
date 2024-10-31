<script setup lang="ts">
const content = defineModel<string>();

const props = defineProps<{
  placeholder: string;
}>();

function onInput(e: Event) {
  const textContent = (e.target as HTMLDivElement).textContent ?? "";
  content.value = textContent;
}

function onBlur(e: Event) {
  if (!content.value) {
    content.value = props.placeholder;
  }
}

if (!content.value) {
  content.value = props.placeholder;
}
</script>
<template>
  <div
    class="outline-none focus:outline-ring caret-primary rounded-sm p-1"
    @blur="onBlur"
    @input="onInput"
    contenteditable="true"
  >
    {{ content }}
  </div>
</template>
