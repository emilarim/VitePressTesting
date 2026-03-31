<template>
  <div class="warning">
    ⚠️ <slot />
  </div>
</template>

<style scoped>
.warning {
  padding: 10px;
  border-left: 4px solid orange;
  background: #fff8e1;
}
</style>