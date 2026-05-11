// theme.js — shared theme switcher
(function () {
    const saved = localStorage.getItem('dpt-theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
  
    window.DPTTheme = {
      themes: [
        { id: 'light',   label: 'Light',    icon: '☀️',  swatch: '#f0f4ff' },
        { id: 'dark',    label: 'Dark',     icon: '🌙',  swatch: '#0d1117' },
        { id: 'forest',  label: 'Forest',   icon: '🌿',  swatch: '#064e3b' },
      ],
      current() { return localStorage.getItem('dpt-theme') || 'light'; },
      set(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('dpt-theme', theme);
        document.querySelectorAll('.theme-option').forEach(el => el.classList.toggle('active', el.dataset.theme === theme));
        document.querySelectorAll('.theme-btn span').forEach(el => {
          const t = this.themes.find(x => x.id === theme);
          if (t) el.textContent = t.icon;
        });
      },
      render(container) {
        const current = this.current();
        const cur = this.themes.find(t => t.id === current) || this.themes[0];
        container.innerHTML = `
          <div class="theme-toggle">
            <button class="theme-btn" onclick="DPTTheme.toggle(this)"><span>${cur.icon}</span> Theme</button>
            <div class="theme-menu" id="theme-menu">
              ${this.themes.map(t => `
                <button class="theme-option ${t.id === current ? 'active' : ''}" data-theme="${t.id}" onclick="DPTTheme.set('${t.id}'); DPTTheme.closeMenu();">
                  <span class="theme-swatch" style="background:${t.swatch}"></span> ${t.icon} ${t.label}
                </button>`).join('')}
            </div>
          </div>`;
        document.addEventListener('click', (e) => { if (!container.contains(e.target)) this.closeMenu(); });
      },
      toggle(btn) { const menu = document.getElementById('theme-menu'); if (menu) menu.classList.toggle('open'); },
      closeMenu() { const menu = document.getElementById('theme-menu'); if (menu) menu.classList.remove('open'); },
      renderMobileNav(activePage, userName, userEmail) {
        const initial = (userName || 'U')[0].toUpperCase();
        const header = document.getElementById('mobile-header');
        if (header) {
          header.innerHTML = `<div class="mark">DPT</div><div class="mobile-header-right"><div id="mob-theme-wrap"></div><div class="mobile-avatar" title="${userEmail || ''}">${initial}</div></div>`;
          const wrap = document.getElementById('mob-theme-wrap');
          if (wrap) DPTTheme.render(wrap);
        }
        const nav = document.getElementById('mobile-nav');
        if (nav) {
          const links = [
            { href: 'dashboard.html', icon: '📊', label: 'Home', id: 'dashboard' },
            { href: 'connect-platforms.html', icon: '🔌', label: 'Connect', id: 'connect' },
            { href: 'history.html', icon: '📈', label: 'History', id: 'history' },
            { href: 'recommendations.html', icon: '💡', label: 'Tips', id: 'recommendations' },
            { href: 'settings.html', icon: '⚙️', label: 'Settings', id: 'settings' },
          ];
          nav.innerHTML = `<div class="mobile-nav-inner">${links.map(l => `<a href="${l.href}" class="mobile-nav-item ${l.id === activePage ? 'active' : ''}"><span class="mobile-nav-icon">${l.icon}</span>${l.label}</a>`).join('')}</div>`;
        }
      }
    };
  })();