let interval = '';
let flashInterval = '';

//eslint-disable-next-line
addEventListener('message', function(e) {
  switch (e.data) {
    case 'start':
      interval = setInterval(() => {
        postMessage('tick');
      }, 1000);
      break;
    case 'flash':
      flashInterval = setInterval(() => {
        postMessage('flash');
      }, 1000);
      break;
    case 'clearTimer':
      clearInterval(interval);
      break;
    case 'clearFlash':
      clearInterval(flashInterval);
      break;
    default:
      clearInterval(interval);
      clearInterval(flashInterval);
      break;
  }
});
