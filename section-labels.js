// Editorial section label transform.
//
// Splits the leading "01 — Title" / "02 · Title" / "03 - Title" prefix
// into <span class="sl-num"> + <span class="sl-text"> so CSS can style
// the number as a confident editorial anchor.
//
// Idempotent: safe to call more than once. Runs on DOMContentLoaded.

(function () {
  function transformLabels() {
    const labels = document.querySelectorAll('.section-label');
    labels.forEach(function (el) {
      // Already transformed? Skip.
      if (el.querySelector('.sl-num')) return;

      const raw = el.textContent.trim();
      // Match "01", "02", up to 2 digits, then a separator (— · - – :), then the rest.
      const m = raw.match(/^(\d{1,2})\s*[—·\-–:]\s*(.+)$/);
      if (!m) return;

      const num = m[1];
      const text = m[2];

      // Replace inner content
      el.textContent = '';
      const numSpan = document.createElement('span');
      numSpan.className = 'sl-num';
      numSpan.textContent = num;

      const textSpan = document.createElement('span');
      textSpan.className = 'sl-text';
      textSpan.textContent = text;

      el.appendChild(numSpan);
      el.appendChild(textSpan);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', transformLabels);
  } else {
    transformLabels();
  }
})();
