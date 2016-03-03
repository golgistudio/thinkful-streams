var stream = require('stream');

function Filter(options) {
    stream.Transform.call(this, options);

    this._minThreshold = 100
    
};

Filter.prototype = Object.create(stream.Transform.prototype);
Filter.prototype.constructor = stream.Transform;

Filter.prototype._transform = function(chunk, encoding, callback) {
 
    var temp = parseInt(chunk.toString())
    if (temp > this._minThreshold) {
        this.push(chunk)
    } else {
        console.log("           excluded - " + temp)
    }
    
    callback();
};

module.exports = Filter;

