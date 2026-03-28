// ── Service Worker registration & PWA install prompt ───────────────────
(function () {
  if (!('serviceWorker' in navigator)) return;

  // Register the service worker on window load
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('[SW] Registered successfully. Scope:', registration.scope);
      })
      .catch((error) => {
        console.error('[SW] Registration failed:', error);
      });
  });

  // ── A2HS (Add to Home Screen) install prompt ──────────────────────────
  let deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default mini-infobar
    event.preventDefault();

    // Don't show if user previously dismissed
    if (localStorage.getItem('ss_install_dismissed')) return;

    deferredPrompt = event;

    const banner = document.getElementById('install-prompt');
    if (!banner) return;

    banner.classList.remove('hidden');

    // Install button
    const btnInstall = document.getElementById('btn-install');
    if (btnInstall) {
      btnInstall.addEventListener('click', () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choice) => {
          console.log('[PWA] Install prompt outcome:', choice.outcome);
          deferredPrompt = null;
          banner.classList.add('hidden');
        });
      });
    }

    // Dismiss button
    const btnDismiss = document.getElementById('btn-dismiss');
    if (btnDismiss) {
      btnDismiss.addEventListener('click', () => {
        banner.classList.add('hidden');
        localStorage.setItem('ss_install_dismissed', 'true');
        deferredPrompt = null;
      });
    }
  });
})();
