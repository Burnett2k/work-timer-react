let interval = '';
let flashInterval = '';

self.addEventListener('message', function(e) {
    switch (e.data) {
        case 'start':
            interval = setInterval(() => {
                self.postMessage('tick');
            }, 1000);
            break;
        case 'flash':
            flashInterval = setInterval(() => {
                self.postMessage('flash');
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
