/* Trikorporation shell: a slim top bar and a footer for every odtriki.com project.
 * One file, hosted on odtriki.com, loaded by every project:
 *   <script src="https://odtriki.com/shell/tk.js" data-name="Chess" defer></script>
 * Both parts live in a Shadow DOM, so no project's CSS can restyle them (and they cannot restyle the project).
 * The bar is NOT sticky on purpose: it never collides with a project's own fixed or sticky header. */
(function () {
  if (window.__tk) return;
  window.__tk = true;

  var script = document.currentScript;
  var name = (script && script.getAttribute('data-name')) || '';
  var HOME = 'https://odtriki.com';

  // brand fonts (Bricolage Grotesque + Figtree), loaded once
  if (!document.querySelector('link[data-tk-fonts]')) {
    var f = document.createElement('link');
    f.rel = 'stylesheet';
    f.setAttribute('data-tk-fonts', '');
    f.href = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700..800&family=Figtree:wght@500;600;700&display=swap';
    document.head.appendChild(f);
  }

  var TILE = '<svg viewBox="0 0 120 120" aria-hidden="true"><rect width="120" height="120" rx="22" fill="#11A24F"/><path d="M30 32h66l-5 18H72l-8 44H46l8-44H25z" fill="#0B3D2E"/><path d="M78 32h18l-4 14z" fill="#C6F432"/></svg>';

  var BASE = ':host{display:block;all:initial;display:block}' +
    '*{box-sizing:border-box}' +
    '.w{background:#0B3D2E;color:#F7F5EC;font-family:"Figtree",system-ui,-apple-system,"Segoe UI",sans-serif;-webkit-font-smoothing:antialiased}' +
    '@media (prefers-color-scheme:dark){.w{background:#1B5E47}}' +
    '.in{max-width:80rem;margin:0 auto;padding:0 clamp(1rem,4vw,2rem);display:flex;align-items:center;justify-content:space-between;gap:1rem}' +
    'a{color:inherit;text-decoration:none}' +
    'a:focus-visible{outline:2px solid #C6F432;outline-offset:2px;border-radius:6px}' +
    '.logo{display:inline-flex;align-items:center;gap:.65rem;font-family:"Bricolage Grotesque","Arial Black",system-ui,sans-serif;font-weight:800;letter-spacing:-.01em}' +
    '.logo svg{width:1.75rem;height:1.75rem;flex-shrink:0}';

  var BAR_CSS = BASE +
    '.in{min-height:3.25rem}' +
    '.logo{font-size:1rem}' +
    '.crumb{display:inline-flex;align-items:center;gap:.65rem;font-weight:600;font-size:.9rem;opacity:.8}' +
    '.crumb::before{content:"";width:1px;height:1rem;background:currentColor;opacity:.4}' +
    '.l{display:flex;align-items:center;gap:.9rem;min-width:0}' +
    'nav{display:flex;gap:1.25rem;font-size:.88rem;font-weight:600}' +
    'nav a{opacity:.85;padding:.25rem 0;border-bottom:2px solid transparent;transition:opacity .15s,border-color .15s}' +
    'nav a:hover{opacity:1;border-bottom-color:#C6F432}' +
    '@media (max-width:34rem){.logo .t{display:none}.crumb{font-size:.85rem}}';

  var FOOT_CSS = BASE +
    '.in{padding-top:1.5rem;padding-bottom:1.5rem;flex-wrap:wrap}' +
    '.end{display:inline-flex;align-items:center;gap:.6rem;font-weight:700;font-size:.9rem}' +
    '.end svg{width:1.25rem;height:1.25rem}' +
    '.r{display:flex;gap:1.25rem;font-size:.85rem;font-weight:600;opacity:.85;flex-wrap:wrap}' +
    '.r a:hover{opacity:1;text-decoration:underline;text-underline-offset:3px}';

  function define(tag, css, html) {
    if (customElements.get(tag)) return;
    customElements.define(tag, class extends HTMLElement {
      connectedCallback() {
        if (this.shadowRoot) return;
        var r = this.attachShadow({ mode: 'open' });
        r.innerHTML = '<style>' + css + '</style>' + html;
      }
    });
  }

  define('tk-bar', BAR_CSS,
    '<div class="w"><div class="in">' +
      '<div class="l"><a class="logo" href="' + HOME + '" aria-label="Trikorporation">' + TILE + '<span class="t">Trikorporation</span></a>' +
      (name ? '<span class="crumb">' + name.replace(/[<>&]/g, '') + '</span>' : '') + '</div>' +
      '<nav aria-label="Trikorporation"><a href="' + HOME + '/#projects">Projects</a><a href="' + HOME + '/cv/">CV</a></nav>' +
    '</div></div>');

  define('tk-foot', FOOT_CSS,
    '<div class="w"><div class="in">' +
      '<span class="end">' + TILE + 'a Trikorporation brand</span>' +
      '<div class="r"><a href="' + HOME + '">odtriki.com</a><a href="' + HOME + '/cv/">CV</a><span>Bordeaux, France</span></div>' +
    '</div></div>');

  function mount() {
    if (document.querySelector('tk-bar')) return;
    var b = document.createElement('tk-bar');
    document.body.insertBefore(b, document.body.firstChild);
    document.body.appendChild(document.createElement('tk-foot'));
  }

  // mount after the page (and any framework hydration) has settled, so React/Vue never see a surprise node
  function later() { setTimeout(mount, 120); }
  if (document.readyState === 'complete') later(); else addEventListener('load', later);
})();
