<script setup lang="ts">
const dialogOpen = defineModel<boolean>({
  default: false,
});

const props = defineProps<{
  title: string;
}>();
</script>
<template>
  <Dialog v-model:open="dialogOpen">
    <DialogContent>
      <DialogTitle> Timer has ended </DialogTitle>
      The timer {{ props.title }} has ended
    </DialogContent>
  </Dialog>
</template>
