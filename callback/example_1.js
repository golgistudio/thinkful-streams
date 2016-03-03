console.log('Console log before calling setTimeout:', new Date());

var callbackFunction = function() {
  console.log('Console log inside callbackFunction:', new Date());  
};

var seconds = 3;
setTimeout(callbackFunction, seconds * 1000);

console.log('Console log after calling setTimeout:', new Date());