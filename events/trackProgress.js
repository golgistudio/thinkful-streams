const EventEmitter = require('events');
const util = require('util');

function ProgressTracker() {
  EventEmitter.call(this);

  this.start = function() {
	this.emit('start');
		for (var i = 0; i < 100; i++) {
			if (i % 10 === 0) {
				this.emit('progress', i)
			}
		}
		this.emit('end')
  }
}

util.inherits(ProgressTracker, EventEmitter);

function onStartCallback() {
	console.log("Starting")
}

function onProgressCallback(value) {
	console.log("...... " + value)
}

function onEndCallback() {
	console.log("End")
}

progressTracker = new ProgressTracker()
progressTracker.on('start', onStartCallback);
progressTracker.on('end', onEndCallback);
progressTracker.on('progress', onProgressCallback)

progressTracker.start()