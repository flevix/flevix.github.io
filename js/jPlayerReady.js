/**
 * Created by flevix on 08.11.13.
 */

function jPlayerCreate(jPlayerId) {
    var cssSelector = {
        jPlayer: "#jquery_jplayer_" + jPlayerId,
        cssSelectorAncestor: "#jp_container_" + jPlayerId
    };
    var playlist = [];
    $.ajax({
        type: "GET",
        url: "./JSON/playlist.json",
        async: false,
        dataType: "json",
        success: function(data) {
            for (var i = 0; i < data["data"].tracks.length; i++) {
                var song = data["data"].tracks[i];
                playlist.push({
                    title:song.title,
                    mp3:song.audio
                });
            }
        }
    });
    var options = {
        swfPath : "./jPlayer",
        supplied : "mp3",
        loop : true,
        globalVolume: true
        , globalUpdate: true
    };
    return new jPlayerPlaylist(cssSelector, playlist, options);
}

$(document).ready(function(){
    var myPlaylist1 = jPlayerCreate("1");
    var player1 = $("#jquery_jplayer_1");
    player1.bind($.jPlayer.event.play, function() {
        alert("play");
        //store to localstorage current playlist
    });
    player1.bind($.jPlayer.event.pause, function() {
//        alert("pause");
    });
    player1.bind($.jPlayer.event.ended, function() {
//        alert("ended");
        var id = myPlaylist1.current - 1;
        var song = {
            title:myPlaylist1.playlist[id].title,
            mp3:myPlaylist1.playlist[id].mp3
        };
        alert(myPlaylist1.current);
        myPlaylist1.add(song);
        myPlaylist1.remove(id);
    });
    //---
    var myPlaylist2 = jPlayerCreate("2");
});