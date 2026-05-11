// js/auth.js — Shared Sidebar & Auth Check
(async function () {
    const { data: { session } } = await sb.auth.getSession();
    if (!session) { window.location.href = LOGIN_URL; return; }
    
    window.currentUser = session.user;
    const name = currentUser.user_metadata?.business_name || currentUser.email.split('@')[0];
  
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      const currentPage = sidebar.dataset.page || 'dashboard';
      sidebar.innerHTML = `
        <div class="sidebar-logo"><div class="mark">DPT</div><div class="sub">Digital Presence Tracker</div></div>
        <nav class="nav">
          <a href="dashboard.html" class="${currentPage === 'dashboard' ? 'active' : ''}">📊 Dashboard</a>
          <a href="connect-platforms.html" class="${currentPage === 'connect' ? 'active' : ''}">🔌 Connect Platforms</a>
          <a href="history.html" class="${currentPage === 'history' ? 'active' : ''}">📈 Score History</a>
          <a href="recommendations.html" class="${currentPage === 'recs' ? 'active' : ''}">💡 Recommendations</a>
          <a href="leaderboard.html" class="${currentPage === 'leaderboard' ? 'active' : ''}">🏆 Leaderboard</a>
          <a href="settings.html" class="${currentPage === 'settings' ? 'active' : ''}">⚙️ Settings</a>
        </nav>
        <div class="sidebar-bottom">
          <button class="btn-logout-sidebar" onclick="logout()">🚪 Sign Out</button>
          <div class="sidebar-user">
            <div class="avatar">${name[0].toUpperCase()}</div>
            <div class="avatar-info">
              <div class="name">${name}</div>
              <div class="email">${currentUser.email}</div>
            </div>
          </div>
        </div>
      `;
    }
  
    sb.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') window.location.href = LOGIN_URL;
    });
  })();
  
  async function logout() {
    await sb.auth.signOut();
    window.location.href = LOGIN_URL;
  }