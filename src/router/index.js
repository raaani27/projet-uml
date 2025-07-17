import { createRouter, createWebHistory } from 'vue-router'
import Home          from '../views/Home.vue'
import Checklist     from '../views/Checklist.vue'
import Equipment     from '../views/Equipement.vue'
import FirstAid      from '../views/PremierSecours.vue'
import Guides        from '../views/Guides.vue'
import Risks         from '../views/Risks.vue'
import Hospitals     from '../views/Hospitals.vue'
import TerrainInfo   from '../views/TerrainInfo.vue'
import SearchResults from '../views/SearchResults.vue'
import AddLocation   from '../views/AddLocation.vue'

const routes = [
  { path: '/',              name: 'Accueil',      component: Home },
  { path: '/checklist',     name: 'Checklist',    component: Checklist },
  { path: '/equipment',     name: 'Équipement',   component: Equipment },
  { path: '/premier-secours', name: 'Secours',    component: FirstAid },
  { path: '/guides',        name: 'Guides',       component: Guides },
  { path: '/risks',         name: 'Risques',      component: Risks },
  { path: '/hospitals',     name: 'Hôpitaux',     component: Hospitals },
  { path: '/terrain',       name: 'TerrainInfo',  component: TerrainInfo },
  { path: '/search',        name: 'Search',       component: SearchResults },
  { path: '/add-location',  name: 'AddLocation',  component: AddLocation },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
