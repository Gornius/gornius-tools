<script setup lang="ts">
const windowSize = useWindowSize();
const smallMode = computed(() => windowSize.width.value <= 800);

const menuClosed = ref<boolean>(false);
const menuHidden = computed(() => !menuClosed.value && smallMode.value);
</script>
<template>
  <div class="flex flex-col h-full min-h-dvh overflow-hidden">
    <div class="flex flex-row gap-4 border-b border-b-border p-4">
      <div
        :hidden="!smallMode"
        class="cursor-pointer"
        @click="menuClosed = !menuClosed"
      >
        🍔
      </div>
      <NuxtLink to="/"><div>Gornius Toolbox</div></NuxtLink>
      <div class="flex-grow"></div>
    </div>
    <div class="flex-grow flex flex-row divide-x border-border">
      <div
        class="flex-grow w-full max-w-sm flex-shrink-0 p-4"
        :hidden="menuHidden"
      >
        <NuxtLink active-class="font-bold" to="/countdown">Countdown</NuxtLink>
      </div>
      <div class="flex-grow p-4 overflow-auto">
        <main class="h-full">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-closed {
  transform: translateX(-100%);
}
</style>
