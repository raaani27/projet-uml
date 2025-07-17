<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <div class="bg-teal-500 text-white p-4 flex items-center">
      <RouterLink to="/" class="mr-3 hover:text-teal-200">
        <HomeIcon class="w-8 h-8"/>
      </RouterLink>
      <h1 class="text-3xl font-semibold">Équipement</h1>
    </div>

    <div class="bg-teal-600 p-4 text-white">
      <h2 class="text-2xl font-bold">Matériel par terrain</h2>
      <p class="text-teal-200">Choisissez une rubrique</p>
    </div>

    <div class="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 flex-1">
      <div
        v-for="cat in categories"
        :key="cat.terrain"
        class="bg-white h-96 flex flex-col justify-start items-start p-10 rounded-3xl shadow-lg hover:shadow-2xl transition"
      >
        <component :is="cat.icon" class="w-16 h-16 text-teal-500 mb-6"/>

        <h3 class="text-2xl font-semibold capitalize mb-4">{{ cat.terrain }}</h3>

        <ul class="list-disc list-inside text-gray-700 text-base space-y-2 columns-2">
          <li v-for="(it, i) in cat.items" :key="i">{{ it }}</li>
        </ul>
      </div>
    </div>

    <NavMenu />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink }    from 'vue-router'
import NavMenu           from '../components/NavMenu.vue'
import {
  HomeIcon,
  MapIcon,
  CloudIcon,
  SparklesIcon,
  SunIcon,
  QuestionMarkCircleIcon
} from '@heroicons/vue/24/outline'
import { supabase }      from '../services/supabase.js'

const iconMap = {
  montagne: MapIcon,
  désert:    SunIcon,
  forêt:     SparklesIcon,
  mer:       CloudIcon
}

const categories = ref([])

onMounted(async () => {
  const { data, error } = await supabase
    .from('equipment')
    .select('terrain, item')
  if (error) {
    console.error(error)
    return
  }

  const map = {}
  data.forEach(({ terrain, item }) => {
    if (!terrain) return
    map[terrain] = map[terrain] || []
    if (Array.isArray(item)) {
      item.forEach(i => {
        if (i && !map[terrain].includes(i)) map[terrain].push(i)
      })
    }
  })

  categories.value = Object.entries(map).map(([terrain, items]) => ({
    terrain,
    items,
    icon: iconMap[terrain] || QuestionMarkCircleIcon
  }))
})
</script>

<style scoped>
div.p-8.grid {
  max-width: 1400px;
  margin: 0 auto;
}
</style>
