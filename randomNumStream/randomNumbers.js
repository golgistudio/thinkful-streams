var stream = require('stream');

function RandomNumber(options) {
    stream.Readable.call(this, options);
    this._min = 25;
    this._max = 225;
    this._count = 0;
    this._maxCount = 100;
};
RandomNumber.prototype = Object.create(stream.Readable.prototype);
RandomNumber.prototype.constructor = stream.Readable;
RandomNumber.prototype.getNextRandomNumber = function() {
    var num =  Math.random() * (this._max - this._min ) + this._min;
    num = Math.round(num)
    return num
}

RandomNumber.prototype._read = function() {
    var val = this.getNextRandomNumber() 
    var buf = new Buffer(val.toString(), 'utf8' );
    console.log(this._count + " - " + val)
    this.push(buf);
    this._count++;
    if (this._count === this._maxCount) {
        this.push(null);
    }
};

module.exports = RandomNumber;
