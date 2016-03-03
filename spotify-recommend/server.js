var unirest = require('unirest');
var express = require('express');
var events = require('events');

var getFromApi = function(endpoint, args) {
    var emitter = new events.EventEmitter();
    console.log('getFromApi - ' + endpoint)
    unirest.get('https://api.spotify.com/v1/' + endpoint)
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

var app = express();
app.use(express.static('public'));

function searchRelated() {

    this.search = function(artist, res) {
        var endpoint = 'artists/' + artist.id + '/related-artists'
        var searchID = getFromApi(endpoint)

        searchID.on('end', function(item) {
            artist.related = item.artists;
            console.log(item.artists)
            res.json(artist);
       
        });

        searchID.on('error', function(code) {
            res.sendStatus(code);
        });
    }
}

var related = new searchRelated() 

app.get('/search/:name', function(req, res) {
    var searchReq = getFromApi('search', {
        q: req.params.name,
        limit: 1,
        type: 'artist'
    });

    searchReq.on('end', function(item) {
        var artist = item.artists.items[0];
        related.search(artist, res)
    });

    searchReq.on('error', function(code) {
        res.sendStatus(code);
    });
});

app.listen(8080);
