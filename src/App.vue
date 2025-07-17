<template>
  <main class="min-h-screen pb-16">
    <router-view/>
  </main>
  <NavMenu />
  <TopNav />
</template>

<script setup>
import NavMenu from './components/NavMenu.vue'
import TopNav from './components/TopNav.vue';
</script>
