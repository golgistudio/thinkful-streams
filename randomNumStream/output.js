var stream = require('stream');

function Output(options) {
    stream.Writable.call(this, options);
};
Output.prototype = Object.create(stream.Writable.prototype);
Output.prototype.constructor = stream.Writable;

Output.prototype._write = function(chunk, encoding, callback) {
    console.log("                         write - " + chunk.toString())
    callback();
};

module.exports = Output;
