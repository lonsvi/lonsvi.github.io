// Theme Toggle
(() => {
  const root = document.documentElement;
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  root.classList.remove("light", "dark");
  root.classList.add(systemTheme);
})();

// Mixpanel Tracking
mixpanel.init("82af7ae09ec18611ca840273f6863e5c");
mixpanel.identify("VCkZzc3LAmKQcPKT");
mixpanel.track("$mp_web_page_view", {
  isGuestApp: "true",
  isCustomDomain: "false",
  versionId: "QrUETGjRcFrFZEmX",
  subdomain: "llx13l74",
  current_domain: "llx13l74.adaptive.ai",
});

// Keyboard Shortcuts and Theme Messages
document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    window.parent.postMessage({ type: 'toggleGoonbarVisibility', source: 'iframe' }, '*');
  } else if (event.key === 'Escape') {
    event.preventDefault();
    window.parent.postMessage({ type: 'minimize', source: 'iframe' }, '*');
  }
}, true);

window.addEventListener('message', (event) => {
  if (!event.data || typeof event.data !== 'object') return;
  if (event.data.type === 'setTheme') {
    const theme = event.data.payload?.theme;
    if (theme === 'dark' || theme === 'light') {
      document.documentElement.classList.remove('dark', 'light');
      document.documentElement.classList.add(theme);
    }
  }
});

// Drawer Functionality
(() => {
  const container = document.querySelector('.__drawer_container');
  const close = document.querySelector('.__auth_close_button');
  function closeFrame() {
    container.classList.add('__hidden');
    const frame = document.getElementById('__AUTH_DRAWER');
    frame.classList.add('__hidden');
  }
  close.addEventListener('click', closeFrame);
  container.addEventListener('click', closeFrame);

  window.__OPEN_AUTH_DRAWER__ = (url) => {
    const frame = document.getElementById('__AUTH_DRAWER');
    const container = document.querySelector('.__drawer_container');
    const close = document.querySelector('.__auth_close_button');
    if (container.classList.contains('__hidden')) {
      container.classList.remove('__hidden');
      frame.src = url;
      frame.onload = () => {
        close.classList.remove('__hidden');
        frame.classList.remove('__hidden');
        frame.contentWindow.focus();
      };
    }
  };
})();