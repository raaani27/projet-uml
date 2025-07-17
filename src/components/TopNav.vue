<template>
    <header class="bg-teal-500 text-white p-4 flex items-center">
      <button @click="$router.back()" class="mr-2">←</button>
      <h1 class="text-lg font-semibold">{{ title }}</h1>
    </header>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  const route = useRoute()
  const title = route.name || 'SafeTrip'
  </script>
  