<template>
  <div>
    <TopNav />
    <Hero title="Checklist" subtitle="Vos listes de vérification" />
    <ul class="p-4 space-y-4">
      <li v-for="list in lists" :key="list.id" class="bg-white p-4 rounded shadow">
        <h3 class="font-semibold">{{ list.name }}</h3>
        <ul class="mt-2 list-disc list-inside">
          <li v-for="it in list.items" :key="it">{{ it }}</li>
        </ul>
      </li>
    </ul>
    <NavMenu />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase }      from '../services/supabase'
import TopNav            from '../components/TopNav.vue'
import Hero              from '../components/Hero.vue'
import NavMenu           from '../components/NavMenu.vue'

const lists = ref([])
onMounted(async () => {
  const { data } = await supabase.from('checklist').select('*')
  lists.value = data || []
})
</script>
