$(document).ready(function() {
//=============================================================

//              Notes for lyric API

//=============================================================

    // // Grab artist name from what is clicked (not an input)
    // let artistName2 = "watsky";

    // // Grab song name same way
    // let songName2 = "Tiny Glowing Screens, Pt. 3";

    // // Allows spaces eg. ".../coldplay/adventure of a life time", %20 workds aswell, NEEDS SPACES (toLowerCase)
    // let queryURL2 = `https://api.lyrics.ovh/v1/${artistName2}/${songName2}`;

    // $.ajax({
    //     url: queryURL2,
    //     method: "GET"
    // }).then(function (response2) {
    //     console.log(response2);
    //     $(".displayPar").text(response2.lyrics);
    // });

//=============================================================

// Ctrl + F to find "Temporary", These will be things that still need changed to work with final product

//=============================================================

    // When an artists is searched
    const itunesAlbumAJAX = () => {
        event.preventDefault();

        // Temporary
        // Static Div on HTML
        const $tempDiv = $(".tempDiv");

        // Temporary
        // Empties the display
        $tempDiv.empty();

        // Grabs the value of the search
        let artistInput = $("#searchBox").val().trim();

        // Query URL for album search, artistInput only var interaction
        let albumQueryURL = `https://itunes.apple.com/search?media=music&limit=15&entity=album&term=${artistInput}`

        $.ajax({
            url: albumQueryURL,
            method: "GET",
            datatype: "json"
        }).then(function(albumResponse) {
            // Parsing the response to make it a JSON object
            let parsedAlbumResponse = JSON.parse(albumResponse);

            // Shorthand for navigating the object
            let albumResults = parsedAlbumResponse.results;

            // Loops over the results
            $.each(albumResults, function(index, value) {
                // Temporary
                // Created elements needed for interacting with the HTML
                const $albumNamePar = $("<p>");
                const $albumNameDiv = $("<div>");
                const $SongDiv = $("<div>");
                const $fullGroupDiv = $("<div>");

                // If the track count isn't one append album (prevents singles from being appended)
                if(value.trackCount !== 1) {
                    // Changes the text to the censored name
                    $albumNamePar.text(value.collectionCensoredName);

                    // Adds attributes for[album-name, album,length, artist-name, album-index],
                    //  adds class of albumDiv (used for on click), appends $albumNamePar
                    $albumNameDiv.attr("data-album-name", value.collectionCensoredName).attr("data-album-length", value.trackCount).attr("data-artist-name", value.artistName).attr("data-index", index).addClass("albumDiv").append($albumNamePar);

                    // Adds class of albumx to song div, empty div for storing songs eg. album4
                    $SongDiv.addClass("album" + index);

                    // Adds class of fullGroupDiv, appends the Album div and empty song Div
                    $fullGroupDiv.addClass("fullGroupDiv").append($albumNameDiv, $SongDiv);

                    // Appends the full group div to the display
                    $tempDiv.append($fullGroupDiv);
                }                
            })
        })
    }

    // Temporary
    // Could not get fat arrow functions to interact with "this", if addressed refactor with ES6
        // const itunesSongAJAX = () => {

        //     let $this = $(this);
        //     console.log($this);

        //     let albumName = $this.attr("data-album-name");
        //     console.log(albumName);
            
        //     let songQueryURL = `https://itunes.apple.com/search?media=music&entity=song&term=${albumName}&limit=${trackCount}`
        // }

    // Called when album is clicked
    function TEMPitunesSongAJAX() {
        // Shorthand
        let $this = $(this);
        let albumName = $this.attr("data-album-name");
        let albumLength = $this.attr("data-album-length");
        let artistName = $this.attr("data-artist-name");
        let $albumIndex = $(".album" + $this.attr("data-index"));

        // Query for Song search, limits to album length
        let songQueryURL = `https://itunes.apple.com/search?media=music&entity=song&term=${albumName}&limit=${albumLength}`;

        $.ajax({
            url: songQueryURL,
            method: "GET",
            datatype: "json"
        }).then(function(songResponse) {
            // Parsing the response to make it a JSON object
            let parsedSongResponse = JSON.parse(songResponse);

            // Shorthand for interacting with JSON
            let songResults = parsedSongResponse.results;

            // If the data-state is open it empties the song div
            if($this.attr("data-state") === "open") {
                // Sets data-state to closed
                $this.attr("data-state", "closed");
                $albumIndex.empty();
            }

            // If the data-state is not open, opens it            
            else {
                // Loop for songs
                $.each(songResults, function(index, value) {
                    // Shorthand
                    const $songNamePar = $("<p>");
                    const $songNameDiv = $("<div>");

                    // Changes the Text to the song name
                    $songNamePar.text(value.trackCensoredName);

                    // Adds attributes for[song-name, artist-name], adds class of songDiv, appends songNamePar
                    $songNameDiv.attr("data-song-name", value.trackCensoredName).attr("data-artist-name", artistName).addClass("songDiv").append($songNamePar);

                    // Appends the Song name div to the empty song div
                    $albumIndex.append($songNameDiv);
                    
                    // Sets the attribute of data-state to open
                    $this.attr("data-state", "open")
                });
            }
        });
    }

//=============================================================

//              On Clicks

//=============================================================

    $("#searchBtn").on("click", itunesAlbumAJAX);
    $(".tempDiv").on("click", ".albumDiv", TEMPitunesSongAJAX);
    $(".tempDiv").on("click", ".songDiv", TEMPlyricsAJAX)

//=============================================================
});