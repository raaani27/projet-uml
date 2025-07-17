import { supabase } from './supabase'

export async function searchAll(term) {
  term = term.toLowerCase()
  const tables = [
    'checklist',
    'equipment',
    'firstaid',
    'guides',
    'risks',
    'terrain_info'
  ]
  const results = {}

  for (let table of tables) {
    const { data, error } = await supabase.from(table).select('*')
    if (error) {
      console.warn(`searchAll: échec sur ${table}`, error.message)
      results[table] = []
      continue
    }
    results[table] = (data || []).filter(row =>
      Object.values(row).some(val => {
        if (!val) return false
        if (Array.isArray(val)) {
          return val.some(v => typeof v === 'string' && v.toLowerCase().includes(term))
        }
        return typeof val === 'string' && val.toLowerCase().includes(term)
      })
    )
  }

  return results
}
