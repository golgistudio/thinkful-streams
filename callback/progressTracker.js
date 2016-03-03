

function progressTracker(onStart, onProgress, onEnd) {
	this._onStart = onStart
	this._onProgress = onProgress
	this._onEnd = onEnd

	this.start = function() {
		this._onStart()
		for (var i = 0; i < 100; i++) {
			if (i % 10 === 0) {
				this._onProgress(i)
			}
		}
		this._onEnd()
	}
}

function onStartCallback() {
	console.log("Starting")
}

function onProgressCallback(value) {
	console.log("...... " + value)
}

function onEndCallback() {
	console.log("End")
}

var progress = new progressTracker(onStartCallback, onProgressCallback, onEndCallback)

progress.start()