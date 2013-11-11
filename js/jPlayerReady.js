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
        supplied : "mp3"
    };
    return new jPlayerPlaylist(cssSelector, playlist, options);
};

$(document).ready(function(){
    var myPlaylist1 = jPlayerCreate("1");
    //---
    var myPlaylist2 = jPlayerCreate("2");
});