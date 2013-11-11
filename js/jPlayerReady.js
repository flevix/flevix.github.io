/**
 * Created by flevix on 08.11.13.
 */
$(document).ready(function(){
    var cssSelector = {
        jPlayer: "#jquery_jplayer_1",
        cssSelectorAncestor: "#jp_container_1"
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
    var myPlaylist = new jPlayerPlaylist(cssSelector, playlist, options);
    //---
    var cssSelector2 = {
        jPlayer: "#jquery_jplayer_2",
        cssSelectorAncestor: "#jp_container_2"
    };
    var playlist2 = [];
    $.ajax({
        type: "GET",
        url: "./JSON/playlist.json",
        async: false,
        dataType: "json",
        success: function(data) {
            for (var i = 0; i < data["data"].tracks.length; i++) {
                var song = data["data"].tracks[i];
                playlist2.push({
                    title:song.title,
                    mp3:song.audio
                });
            }
        }
    });
    var options2 = {
        swfPath : "./jPlayer",
        supplied : "mp3"
    };
    var myPlaylist2 = new jPlayerPlaylist(cssSelector2, playlist2, options2);
});