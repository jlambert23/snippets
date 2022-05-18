// javascript: (function () { function copyToClip(str) { function listener(e) { e.clipboardData.setData('text/html', str); e.clipboardData.setData('text/plain', str); e.preventDefault(); } document.addEventListener('copy', listener); document.execCommand('copy'); document.removeEventListener('copy', listener); } copyToClip('<a href="' + window.location.href + '">' + document.title + '</a>');})();

(function () {
  function copyToClip(str) {
    function listener(e) {
      e.clipboardData.setData('text/html', str);
      e.clipboardData.setData('text/plain', str);
      e.preventDefault();
    }
    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);
  }
  copyToClip('<a href="' + window.location.href + '">' + document.title + '</a>');
})();
