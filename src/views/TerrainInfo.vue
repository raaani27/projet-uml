<template>
  <div class="min-h-screen flex flex-col">
    <TopNav />
    <Hero title="Terrain" subtitle="Informations terrain" />

    <main class="p-4 flex-1 space-y-6 overflow-auto">

      <section class="bg-white p-8 rounded shadow text-center space-y-4">
        <h3 class="text-2xl font-semibold">Ajouter un nouveau lieu</h3>
        <p class="text-gray-600">
          Vous n’avez pas trouvé votre lieu ?<br/>
          Cliquez ci-dessous pour l’ajouter.
        </p>
        <RouterLink
          to="/add-location"
          class="inline-block bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition"
        >
          + Ajouter un lieu
        </RouterLink>
      </section>

      <section
        v-for="t in terrains"
        :key="t.id"
        class="bg-white p-4 rounded shadow"
      >
        <h3 class="font-semibold">{{ t.name }}</h3>
        <p class="mt-1">{{ t.description }}</p>
        <p v-if="t.coordinates" class="mt-1 text-sm text-gray-500">
          Coordonnées : {{ t.coordinates.y }}, {{ t.coordinates.x }}
        </p>
      </section>

    </main>

    <NavMenu />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink }     from 'vue-router'
import TopNav              from '../components/TopNav.vue'
import Hero                from '../components/Hero.vue'
import NavMenu             from '../components/NavMenu.vue'
import { supabase }        from '../services/supabase.js'

const terrains = ref([])

onMounted(async () => {
  const { data, error } = await supabase
    .from('terrain_info')
    .select('id, name, description, coordinates')
  if (error) {
    console.error('Erreur chargement terrains :', error)
    return
  }
  terrains.value = data
})
</script>
