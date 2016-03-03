var unirest = require('unirest');
var express = require('express');
var events = require('events');

// Make API call
var getFromApi = function(endpoint, args) {
    var emitter = new events.EventEmitter();
    var url = 'https://api.spotify.com/v1/' + endpoint
    console.log('getFromApi - ' + url)
    unirest.get(url)
           .qs(args)
           .end(function(response) {
                if (response.ok) {
                    emitter.emit('end', response.body);
                }
                else {
                    emitter.emit('error', response.code);
                }
            });
    return emitter;
};

// Global error callback
function globalErrorCallback() {
    this.handleError = function(res, code, message) {
        console.log('Error: ' + code + " : " + message)
           res.sendStatus(code);
    }
}

var errorCallback = globalErrorCallback();

// Get top tracks
function getTopTracks(length, doneCallback) {
    var count = 0

    this.fetch = function(relatedArtist) {
        var endpoint = 'artists/' + relatedArtist.id + '/top-tracks/?country=US'
        var searchID = getFromApi(endpoint)

        function checkCount() {
            console.log(count + " - " + relatedArtist.name)
            if (count === length) {

                // Return the results - artist and related artists
                doneCallback('no error')
            }
        }

        searchID.on('end', function(item) {
            relatedArtist.tracks = item.tracks
            count = count+1
            checkCount()
        });

        searchID.on('error', function(code) {
            doneCallback('error', code)
        });
    }

}

// Search for related artists
function searchRelated() {
    this.search = function(artist, doneCallback) {
        var endpoint = 'artists/' + artist.id + '/related-artists'
        var searchID = getFromApi(endpoint)

        searchID.on('end', function(item) {

            artist.related = item.artists
            relatedArtists = item.artists
            var length = relatedArtists.length

            var topTracks = new getTopTracks(length, doneCallback)

            for (var i = 0; i < length; i++) {
                topTracks.fetch(relatedArtists[i])
            }
        });

        searchID.on('error', function(code) {
            doneCallback('error', code);
        });
    }
}

// Get artists by name and drill down
function getArtistByNameCallback(req, res) {
    var searchReq = getFromApi('search', {
        q: req.params.name,
        limit: 1,
        type: 'artist'
    });

    searchReq.on('end', function(item) {
        var related = new searchRelated() 

        var artist = item.artists.items[0];

        function doneCallback(status, code) {  
            if (status === 'no error') {
                res.json(artist)
            } else {
                lobalErrorCallback.handleError(code);
            } 
        }

        // For the selected artist, get related artists
        related.search(artist, doneCallback)
    });

    searchReq.on('error', function(code) {
        globalErrorCallback.handleError(code);
    });
}


// Initial route to retrieve requested artist from spotify
var app = express();
app.use(express.static('public'));

app.get('/search/:name', getArtistByNameCallback);

app.listen(8080);
