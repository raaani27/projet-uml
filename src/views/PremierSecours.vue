<template>
  <div class="min-h-screen flex flex-col">
    <TopNav title="Premiers secours" />
    <Hero title="Premiers secours" subtitle="Fiches d'urgence" />

    <ul class="p-4 space-y-4 flex-1 overflow-auto">
      <li
        v-for="f in fiches"
        :key="f.id"
        class="bg-white p-4 rounded-lg shadow flex items-start justify-between"
      >
        <div>
          <h3 class="font-semibold">{{ f.title }}</h3>
          <p class="mt-2">{{ f.content }}</p>
        </div>
        <button
          @click="playTucheAudio(f.content)"
          class="ml-4 p-2 rounded-full hover:bg-gray-100"
          aria-label="Écouter la description"
        >
          <SpeakerWaveIcon class="w-6 h-6 text-teal-500" />
        </button>
      </li>
    </ul>

    <NavMenu />
  </div>
</template>

<script setup>
import { ref, onMounted }  from 'vue'
import TopNav              from '../components/TopNav.vue'
import Hero                from '../components/Hero.vue'
import NavMenu             from '../components/NavMenu.vue'
import { supabase }        from '../services/supabase.js'
import { SpeakerWaveIcon } from '@heroicons/vue/24/outline'

const fiches = ref([])
const voices = ref([])

onMounted(async () => {
  const { data, error } = await supabase
    .from('firstaid')
    .select('id,title,content')
  if (error) console.error('Erreur chargement firstaid :', error)
  else fiches.value = data

  function loadVoices() {
    voices.value = window.speechSynthesis.getVoices()
  }
  loadVoices()
  window.speechSynthesis.onvoiceschanged = loadVoices
})

function playTucheAudio(text) {
  if (!text) return
  if (!('speechSynthesis' in window)) {
    alert("❌ Synthèse vocale non supportée.")
    return
  }
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel()
  }

  const utt = new SpeechSynthesisUtterance(text)
  utt.lang   = 'fr-FR'
  utt.volume = 1
  utt.rate   = 1.1  
  utt.pitch  = 6.1   
  const frVoices = voices.value.filter(v => v.lang.startsWith('fr'))
  let tucheVoice = frVoices.find(v => /Paul|Hortense/.test(v.name))
  if (!tucheVoice && frVoices.length) {
    tucheVoice = frVoices[0]
  }
  if (tucheVoice) {
    utt.voice = tucheVoice
    console.log('▶️ Voix sélectionnée pour Tuche :', tucheVoice.name)
  }

  speechSynthesis.speak(utt)
}
</script>

