<template>
  <button @click="handleClick">
    {{ label }}
  </button>
</template>

<script setup>
// ✅ props (data passed from Markdown)
const props = defineProps({
  label: {
    type: String,
    default: 'Click me'
  }
})

// ✅ event handler
const handleClick = () => {
  alert(`You clicked: ${props.label}`)
}
</script>

<style scoped>
button {
  padding: 8px 12px;
  background: #646cff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>