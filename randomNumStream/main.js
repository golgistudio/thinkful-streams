var RandomNumber = require('./randomNumbers');
var Filter = require('./filter')
var Output = require('./output')

var randomNum = new RandomNumber();
var filter = new Filter()
var output = new Output()

randomNum.pipe(filter).pipe(output)

output.on('data', function(chunk) {
    console.log("on - " + chunk.toString());
});

