function wait(seconds, callback) {
  setTimeout(function(){
    callback(new Date());
  }, seconds * 1000);
}

console.log('Console log before calling wait:', new Date());

wait(3, function(date) {
  console.log('Console log inside first callback:', date);
  wait(2, function(date) {
    console.log('Console log inside second callback:', date);
    wait(5, function(date) {
      console.log('Console log inside third callback:', date);
    });
  });
});

console.log('Console log after calling wait:', new Date());