<template>
  <div class="flex flex-col h-full min-h-dvh">
    <div class="flex flex-row gap-4 border-b border-b-border p-4">
      <NuxtLink to="/"><div>Logo</div></NuxtLink>
      <div class="flex-grow"></div>
      <div>NavRight</div>
    </div>
    <div class="flex-grow flex flex-row divide-x border-border">
      <div class="flex-grow max-w-sm p-4">
        <NuxtLink active-class="font-bold" to="/countdown">Countdown</NuxtLink>
      </div>
      <div class="flex-grow p-4">
        <main class="h-full">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>
