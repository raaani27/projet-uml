<template>
    <section class="p-6 bg-teal-100 rounded-lg my-4">
      <h2 class="text-2xl font-bold">{{ title }}</h2>
      <p class="mt-2 text-gray-700">{{ subtitle }}</p>
    </section>
  </template>
  
  <script setup>
  defineProps({
    title:    { type: String, default: 'Bienvenue sur SafeTrip' },
    subtitle: { type: String, default: 'Votre guide de sécurité' }
  })
  </script>
  