import { supabase } from './supabase'
export async function fetchTerrains() {
  const { data } = await supabase.from('terrain_info').select('*')
  console.log(data);
  return data || []
}
