// Apply before paint; privacy/storage restrictions must never block reading.
try { document.documentElement.setAttribute('data-theme', localStorage.getItem('isun1-theme') === 'night' ? 'night' : 'day'); } catch { document.documentElement.setAttribute('data-theme', 'day'); }
