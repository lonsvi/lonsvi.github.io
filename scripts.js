(function() {
  const container = document.querySelector('.__drawer_container');
  const close = document.querySelector('.__auth_close_button');
  function closeFrame() {
    container.classList.add('__hidden');
    const frame = document.getElementById('__AUTH_DRAWER');
    frame.classList.add('__hidden');
  }
  close.addEventListener('click', closeFrame);
  container.addEventListener('click', closeFrame);
})();

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
}