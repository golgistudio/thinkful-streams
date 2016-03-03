console.log('Console log before calling wait:', new Date());

(async function() {
  var foo = await wait(3);
  console.log('Console log after three seconds:', foo);
  var bar = await wait(1);
  console.log('Console log after one second:', foo);
  var baz = await wait(5);
  console.log('Console log after five seconds:', foo);
}());

console.log('Console log after calling wait:', new Date());
