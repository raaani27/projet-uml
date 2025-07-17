<template>
  <div class="min-h-screen flex flex-col">
    <TopNav />
    <Hero title="Ajouter un lieu" subtitle="Type de terrain" />

    <main class="p-4 flex-1">
      <form @submit.prevent="onSubmit" class="space-y-4 max-w-md mx-auto">
        <div>
          <label class="block text-sm font-medium">Type de terrain</label>
          <select
            v-model="terrainType"
            required
            class="mt-1 block w-full border rounded px-3 py-2"
          >
            <option disabled value="">— Sélectionnez un type —</option>
            <option
              v-for="t in terrainOptions"
              :key="t"
              :value="t"
            >
              {{ capitalize(t) }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium">Adresse ou nom du lieu</label>
          <input
            v-model="address"
            type="text"
            required
            class="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label class="block text-sm font-medium">Nom affiché</label>
          <input
            v-model="name"
            type="text"
            required
            class="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label class="block text-sm font-medium">Description</label>
          <textarea
            v-model="description"
            rows="2"
            class="mt-1 block w-full border rounded px-3 py-2"
          ></textarea>
        </div>

        <button
          type="submit"
          class="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
        >
          Ajouter et géocoder
        </button>
      </form>

      <p v-if="error" class="mt-4 text-red-600 text-center">{{ error }}</p>
      <p v-if="success" class="mt-4 text-green-600 text-center">
        Lieu ajouté avec succès !
      </p>
    </main>

    <NavMenu />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TopNav  from '../components/TopNav.vue'
import Hero    from '../components/Hero.vue'
import NavMenu from '../components/NavMenu.vue'
import { supabase }         from '../services/supabase.js'
import { geocodeAndClassify } from '../services/geo.js'
import { findNearestHospital } from '../services/hospitals.js'

const terrainOptions = ref([])
const terrainType    = ref('')
const address        = ref('')
const name           = ref('')
const description    = ref('')
const error          = ref(null)
const success        = ref(false)

onMounted(async () => {
  const { data, error: err } = await supabase
    .from('terrain_info')
    .select('terrain')
  if (err) {
    console.error('Erreur load terrains :', err)
    return
  }
  terrainOptions.value = Array.from(
    new Set(data.map(r => r.terrain).filter(Boolean))
  )
})

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

async function onSubmit() {
  error.value   = null
  success.value = false

  try {
    const { lat, lon } = await geocodeAndClassify(address.value)

    const { error: insErr } = await supabase
      .from('terrain_info')
      .insert({
        name:        name.value,
        description: description.value,
        terrain:     terrainType.value,
        coordinates: { x: lon, y: lat }
      })
    if (insErr) throw insErr

    const hosp = await findNearestHospital(lat, lon, 100000)
    if (hosp) {
      await supabase.from('hospitals').upsert({
        id:          hosp.id,
        name:        hosp.name,
        address:     hosp.address,
        phone:       hosp.phone,
        coordinates: { x: hosp.coordinates.x, y: hosp.coordinates.y }
      })
    }

    success.value = true
    terrainType.value = ''
    address.value     = ''
    name.value        = ''
    description.value = ''
  }
  catch (err) {
    console.error(err)
    error.value = err.message || 'Une erreur est survenue.'
  }
}
</script>