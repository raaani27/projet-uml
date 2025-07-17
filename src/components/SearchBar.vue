<template>
  <form @submit.prevent="onSearch" class="flex p-2">
    <input
      v-model="q"
      type="text"
      placeholder="Recherche..."
      class="flex-1 border rounded-l px-3 py-1"
    />
    <button type="submit" class="bg-teal-500 text-white px-4 rounded-r">
      OK
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const q = ref('')
const router = useRouter()

function onSearch() {
  if (!q.value) return
  router.push({ name: 'SearchResults', params: { q: q.value } })
  q.value = ''
}
</script>
