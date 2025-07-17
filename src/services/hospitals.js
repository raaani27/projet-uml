import { supabase } from './supabase'
import { haversine } from './geo.js'

export async function fetchNearbyHospitals(lat, lon, maxDist = Infinity) {
  const { data: hospitals, error } = await supabase
    .from('hospitals')
    .select('id, name, address, phone, coordinates')
  if (error) {
    console.error(error)
    return []
  }

  return hospitals
    .map(h => {
      const lng  = h.coordinates.x
      const latH = h.coordinates.y

      const distance = haversine(lat, lon, latH, lng)
      return { ...h, distance }
    })
    .filter(h => h.distance <= maxDist)
    .sort((a, b) => a.distance - b.distance)
}

export async function findNearestHospital(lat, lon, maxDist = 50000) {
  const arr = await fetchNearbyHospitals(lat, lon, maxDist)
  return arr.length ? arr[0] : null
}
