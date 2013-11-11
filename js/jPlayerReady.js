/**
 * Created by flevix on 08.11.13.
 */
$(document).ready(function(){

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

    var myPlaylist = new jPlayerPlaylist(
        {
            jPlayer: "#jquery_jplayer_1",
            cssSelectorAncestor: "#jp_container_1"
        },
        playlist,
        {
            swfPath : "./jPlayer",
            supplied : "mp3"
        }
    );

    //myPlaylist.setPlaylist();
    //---
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
    var myPlaylist2 = new jPlayerPlaylist(
        {
            jPlayer: "#jquery_jplayer_2",
            cssSelectorAncestor: "#jp_container_2"
        },
        playlist,
        {
            swfPath : "./jPlayer",
            supplied : "mp3"
        }
    );
});