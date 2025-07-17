<template>
  <div class="min-h-screen flex flex-col">
    <TopNav />
    <Hero title="Rechercher" subtitle="Tapez votre requête" />

    <div class="p-4 flex bg-teal-100">
      <input
        v-model="q"
        @keyup.enter="onSearch"
        type="text"
        placeholder="Ex. avalanche, forêt, Clinique…"
        class="flex-1 border rounded-l px-3 py-2"
      />
      <button
        @click="onSearch"
        class="bg-teal-500 text-white px-4 py-2 rounded-r hover:bg-teal-600"
      >
        Go
      </button>
    </div>

    <main class="p-4 flex-1 overflow-auto space-y-6">
      <div v-if="!hasSearched" class="text-center text-gray-500">
        Tapez un mot-clé et appuyez sur Go
      </div>
      <div v-else-if="loading" class="text-center">
        Recherche en cours…
      </div>
      <div v-else-if="noResults" class="text-center text-gray-500">
        Aucune donnée trouvée pour « {{ q }} ».
      </div>

      <template v-else>
        <div
          v-for="([table, rows]) in displayResults"
          :key="table"
          class="mb-6"
        >
          <h2 class="text-lg font-semibold mb-2 capitalize">
            {{ labelMap[table] }}
          </h2>

          <ul
            v-if="table === 'checklist'"
            class="list-disc list-inside space-y-1"
          >
            <li
              v-for="it in rows[0].items"
              :key="it"
            >{{ it }}</li>
          </ul>

          <ul
            v-else-if="table === 'equipment'"
            class="list-disc list-inside space-y-1"
          >
            <li
              v-for="it in rows[0].item"
              :key="it"
            >{{ it }}</li>
          </ul>

          <div v-else-if="table === 'firstaid'" class="space-y-2">
            <div v-for="f in rows" :key="f.id">
              <h3 class="font-semibold">{{ f.title }}</h3>
              <p>{{ f.content }}</p>
            </div>
          </div>

          <ol
            v-else-if="table === 'guides'"
            class="list-decimal list-inside space-y-1"
          >
            <li
              v-for="step in rows[0].steps"
              :key="step"
            >{{ step }}</li>
          </ol>

          <div v-else-if="table === 'risks'" class="space-y-2">
            <div v-for="r in rows" :key="r.id">
              <h3 class="font-semibold">{{ r.name }}</h3>
              <p>{{ r.description }}</p>
            </div>
          </div>

          <div v-else-if="table === 'terrain_info'" class="space-y-2">
            <div v-for="t in rows" :key="t.id">
              <h3 class="font-semibold">{{ t.name }}</h3>
              <p>{{ t.description }}</p>
            </div>
          </div>
        </div>
      </template>
    </main>

    <NavMenu />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TopNav   from '../components/TopNav.vue'
import Hero     from '../components/Hero.vue'
import NavMenu  from '../components/NavMenu.vue'
import { searchAll } from '../services/search'

const q           = ref('')
const results     = ref({})
const loading     = ref(false)
const noResults   = ref(false)
const hasSearched = ref(false)

const labelMap = {
  checklist:    'Checklist',
  equipment:    'Équipement',
  firstaid:     'Secours',
  guides:       'Guides',
  risks:        'Risques',
  terrain_info: 'Terrain'
}

const displayResults = computed(() =>
  Object.entries(results.value).filter(
    ([, rows]) => Array.isArray(rows) && rows.length > 0
  )
)

async function onSearch() {
  const term = q.value.trim()
  if (!term) {
    hasSearched.value = false
    results.value     = {}
    noResults.value   = false
    return
  }

  hasSearched.value = true
  loading.value     = true

  const all = await searchAll(term)
  results.value   = all
  noResults.value = Object.values(all)
                       .every(arr => Array.isArray(arr) && arr.length === 0)

  loading.value = false
}
</script>
