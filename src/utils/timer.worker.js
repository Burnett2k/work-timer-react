self.addEventListener('message', function(e) {
    let result = e.data;
    let workerResult = 'Result: ' + result;
    self.postMessage(workerResult);
});
