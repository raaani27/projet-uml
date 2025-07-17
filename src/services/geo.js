export function haversine(lat1, lon1, lat2, lon2) {
    const toRad = x => x * Math.PI / 180;
    const R = 6371000;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat/2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon/2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  
  
  export async function geocodeAndClassify(query) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
    const resp = await fetch(url, {
      headers: { 'User-Agent': 'SafeTripApp/1.0' }
    });
    const results = await resp.json();
    if (!results.length) {
      throw new Error(`Adresse introuvable : "${query}"`);
    }
    const place = results[0];
    const lat = parseFloat(place.lat);
    const lon = parseFloat(place.lon);
    const type = place.type; 
    let terrainType = 'inconnu';
    if (type === 'peak')      terrainType = 'montagne';
    else if (type === 'coast') terrainType = 'mer';
    else if (type === 'forest')terrainType = 'forêt';
    else if (type === 'sand')  terrainType = 'désert';
    return { lat, lon, terrainType };
  }
  