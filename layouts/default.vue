<template>
  <div class="flex flex-col h-full min-h-dvh">
    <div class="flex flex-row gap-4 border-b border-b-border p-4">
      <div>Logo</div>
      <div class="flex-grow"></div>
      <div>NavRight</div>
    </div>
    <div class="flex-grow flex flex-row divide-x border-border">
      <div class="flex-grow max-w-sm p-4">SideNav</div>
      <div class="flex-grow p-4">Main</div>
    </div>
    <slot />
  </div>
</template>
