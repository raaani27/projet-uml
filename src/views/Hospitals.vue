<template>
  <div class="min-h-screen flex flex-col">
    <div class="bg-teal-500 text-white p-4 flex items-center">
      <RouterLink to="/" class="mr-3 hover:text-teal-200">
        <HomeIcon class="w-6 h-6" />
      </RouterLink>
      <h1 class="text-lg font-semibold">Hôpitaux</h1>
    </div>

    <div class="bg-teal-100 p-4">
      <h2 class="text-xl font-bold">Centres de soins proches</h2>
      <p class="text-gray-700">Liste de tous les hôpitaux enregistrés</p>
    </div>

    <main class="p-4 flex-1 overflow-auto space-y-4">
      <div
        v-for="h in hospitals"
        :key="h.id"
        class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition flex items-start space-x-4"
      >
        <BuildingLibraryIcon class="w-8 h-8 text-teal-500 mt-1" />
        <div>
          <h3 class="font-semibold">{{ h.name }}</h3>
          <p class="text-sm text-gray-600">{{ h.address }}</p>
          <p v-if="h.phone" class="text-sm text-gray-600">📞 {{ h.phone }}</p>
          <p class="text-xs text-gray-500 mt-1">
            {{ (h.distance/1000).toFixed(1) }} km de point de référence
          </p>
        </div>
      </div>
    </main>

    <NavMenu />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import NavMenu from '../components/NavMenu.vue'
import { fetchNearbyHospitals } from '../services/hospitals'
import { HomeIcon, BuildingLibraryIcon } from '@heroicons/vue/24/outline'

const hospitals = ref([])

const refLat = 48.8566    
const refLon = 2.3522

onMounted(async () => {
  hospitals.value = await fetchNearbyHospitals(refLat, refLon, Infinity)
})
</script>
