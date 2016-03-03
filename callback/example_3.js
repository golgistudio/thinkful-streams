function wait(seconds, callback) {
  setTimeout(function(){
    callback(new Date());
  }, seconds * 1000);
}

console.log('Console log before calling wait:', new Date());

wait(3, function(date) {
  console.log('Console log inside anonymous callback:', date);
});

console.log('Console log after calling wait:', new Date());