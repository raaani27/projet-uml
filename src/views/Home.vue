<template>
  <div class="min-h-screen flex flex-col">
    <TopNav />
    <Hero title="Accueil" subtitle="Choisissez une rubrique" />

    <div class="p-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
      <RouterLink
        v-for="cat in categories"
        :key="cat.name"
        :to="cat.to"
        class="flex items-center space-x-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition"
      >
        <component :is="cat.icon" class="w-8 h-8 text-teal-500" />
        <div>
          <h3 class="font-semibold">{{ cat.name }}</h3>
          <p class="text-sm text-gray-500">{{ cat.desc }}</p>
        </div>
      </RouterLink>
    </div>

    <NavMenu />
  </div>
</template>

<script setup>
import TopNav    from '../components/TopNav.vue'
import Hero      from '../components/Hero.vue'
import NavMenu   from '../components/NavMenu.vue'
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

const categories = [
  { name: 'Accueil',    to: '/',            desc: 'Retour à l’accueil',        icon: HomeIcon },
  { name: 'Checklist',  to: '/checklist',   desc: 'Vos listes',                icon: ClipboardDocumentListIcon },
  { name: 'Équipement', to: '/equipment',   desc: 'Matériel par terrain',      icon: MapIcon },
  { name: 'Secours',    to: '/premier-secours',    desc: 'Fiches d’urgence',           icon: HeartIcon },
  { name: 'Guides',     to: '/guides',      desc: 'Guides pratiques',           icon: BookOpenIcon },
  { name: 'Risques',    to: '/risks',       desc: 'Potentiels dangers',         icon: ExclamationTriangleIcon },
  { name: 'Hôpitaux',   to: '/hospitals',   desc: 'Centres de soins',            icon: BuildingLibraryIcon },
  { name: 'Terrain',    to: '/terrain',     desc: 'Infos géolocalisées',        icon: GlobeAltIcon },
  { name: 'Rechercher', to: '/search',      desc: 'Moteur de recherche global', icon: MagnifyingGlassIcon }
]
</script>
