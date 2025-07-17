<template>
  <nav class="fixed bottom-0 inset-x-0 bg-white border-t flex justify-around py-3">
    <RouterLink
      v-for="item in items"
      :key="item.name"
      :to="item.to"
      class="flex flex-col items-center text-gray-600"
    >
      <component :is="item.icon" class="w-8 h-8" />
      <span class="text-sm mt-1">{{ item.name }}</span>
    </RouterLink>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  MapIcon,
  HeartIcon,
  BookOpenIcon,
  ExclamationTriangleIcon,
  BuildingLibraryIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon
} from '@heroicons/vue/24/outline'

const items = [
  { name: 'Accueil',    to: '/',                icon: HomeIcon },
  { name: 'Checklist',  to: '/checklist',       icon: ClipboardDocumentListIcon },
  { name: 'Équipement', to: '/equipment',       icon: MapIcon },
  { name: 'Secours',    to: '/premier-secours', icon: HeartIcon },
  { name: 'Guides',     to: '/guides',          icon: BookOpenIcon },
  { name: 'Risques',    to: '/risks',           icon: ExclamationTriangleIcon },
  { name: 'Hôpitaux',   to: '/hospitals',       icon: BuildingLibraryIcon },
  { name: 'Terrain',    to: '/terrain',         icon: GlobeAltIcon },
  { name: 'Rechercher', to: '/search',          icon: MagnifyingGlassIcon }
]
</script>

<style scoped>
nav {
  min-height: 4rem;
}
</style>
