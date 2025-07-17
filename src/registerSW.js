export function registerSW() {
  if (import.meta.env.DEV) {
    console.log('[PWA] Mode DEV – pas de service worker');
    return;
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(reg => console.log('[PWA] SW enregistré', reg))
        .catch(err => console.error('[PWA] SW registration failed:', err));
    });
  }
}
