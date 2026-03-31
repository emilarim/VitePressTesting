<template>
   <div class="included-markdown" v-html="renderedContent"></div> </template>

<script setup>
import { ref, onMounted } from 'vue'
import { marked } from 'marked'

const props = defineProps({
   src: {
     type: String,
     required: true
   }
})

const renderedContent = ref('')

onMounted(async () => {
   try {
     const response = await fetch(props.src)
     const markdown = await response.text()
     renderedContent.value = marked.parse(markdown)
   } catch (error) {
     console.error(`Failed to load ${props.src}:`, error)
     renderedContent.value = `<div class="error">Failed to load content: 
${props.src}</div>`
   }
})
</script>