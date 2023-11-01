<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  greeting: {
    type: String,
    default: 'Hello, ELi Lets get coding!'
  }
})

</script>

<template>
  <div class="greeting">
    <h1>{{ greeting }}</h1>
  </div>
</template>

<style scoped>
.greeting {
  text-align: center;
  margin-top: 50px;
}
</style>
