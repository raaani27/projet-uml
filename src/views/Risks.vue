<template>
  <div>
    <TopNav />
    <Hero title="Risques" subtitle="Potentiels dangers" />
    <ul class="p-4 space-y-4">
      <li v-for="r in risks" :key="r.id" class="bg-white p-4 rounded shadow">
        <h3 class="font-semibold">{{ r.name }}</h3>
        <p class="mt-2">{{ r.description }}</p>
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

const risks = ref([])
onMounted(async () => {
  const { data } = await supabase.from('risks').select('*')
  risks.value = data || []
})
</script>
