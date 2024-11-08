<script setup lang="ts">
const windowSize = useWindowSize();
const smallMode = computed(() => windowSize.width.value <= 800);

const menuClosed = ref<boolean>(false);
const menuHidden = computed(() => !menuClosed.value && smallMode.value);

type MenuItem = {
  title: string;
  url: string;
};

const menuItems: MenuItem[] = [
  {
    title: "About",
    url: "/",
  },
  {
    title: "Countdown",
    url: "/countdown",
  },
  {
    title: "Timer",
    url: "/timer",
  },
  {
    title: "Stopwatch",
    url: "/stopwatch",
  },
];
</script>
<template>
  <div class="flex flex-col h-full min-h-dvh overflow-hidden">
    <div class="flex flex-row gap-4 border-b p-4 bg-secondary">
      <div
        :hidden="!smallMode"
        class="cursor-pointer"
        @click="menuClosed = !menuClosed"
      >
        🍔
      </div>
      <NuxtLink class="w-full" to="/"><div>Gornius Toolbox</div></NuxtLink>
      <div class="flex-grow"></div>
    </div>
    <div class="flex-grow flex flex-row divide-x">
      <div
        class="flex-grow w-full max-w-xs flex-shrink-0 p-4"
        :hidden="menuHidden"
      >
        <div class="flex flex-col gap-3">
          <NuxtLink
            v-for="menuItem of menuItems"
            :key="menuItem.url"
            class="font-bold"
            active-class="text-primary"
            :to="menuItem.url"
            >{{ menuItem.title }}</NuxtLink
          >
        </div>
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
