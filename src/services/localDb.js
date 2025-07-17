const STORAGE_KEY = 'safe-trip-local'
export function getLocalData() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
}
export function saveLocalData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}
