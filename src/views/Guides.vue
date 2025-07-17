<template>
  <div>
    <TopNav />
    <Hero title="Guides" subtitle="Vos guides pratiques" />
    <ul class="p-4 space-y-6">
      <li v-for="g in guides" :key="g.id" class="bg-white p-4 rounded shadow">
        <h3 class="font-semibold">{{ g.title }}</h3>
        <ol class="mt-2 list-decimal list-inside">
          <li v-for="step in g.steps" :key="step">{{ step }}</li>
        </ol>
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

const guides = ref([])
onMounted(async () => {
  const { data } = await supabase.from('guides').select('*')
  guides.value = data || []
})
</script>
