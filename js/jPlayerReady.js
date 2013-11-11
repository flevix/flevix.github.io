/**
 * Created by flevix on 08.11.13.
 */
$(document).ready(function(){
    var cssSelector = {
        jPlayer: "#jquery_jplayer_1",
        cssSelectorAncestor: "#jp_container_1"
    };
    var options = {
        swfPath : "./jPlayer",
        supplied : "mp3",
        play : function(time) {
            alert("Play!");
            $(this).jPlayer("pauseOthers");
        },
        pause : function(time) {
            alert("Pause!");
        }
    };
    var playlist = [];

    var myPlaylist = new jPlayerPlaylist(cssSelector, playlist, options);

    $.getJSON("./JSON/playlist.json",
        function(data) {
            for (var i = 0; i < data["data"].tracks.length; i++) {
                var song = data["data"].tracks[i];
                myPlaylist.add({
                    title: song.title,
                    mp3: song.audio
                });
            }
//            $.each(data["data"].tracks, function(index, value) {
//                myPlaylist.add({
//                    title : value.title,
//                    mp3 : value.audio
//                });
//            })
        }
    );
    //---
    var cssSelector2 = {
        jPlayer: "#jquery_jplayer_2",
        cssSelectorAncestor: "#jp_container_2"
    };
    var options2 = {
        swfPath : "./jPlayer",
        supplied : "mp3"
    };
    var playlist2 = [];

    var myPlaylist2 = new jPlayerPlaylist(cssSelector2, playlist2, options2);

    $.getJSON("./JSON/playlist.json",
        function(data) {
            $.each(data["data"].tracks, function(index, value) {
                myPlaylist2.add({
                    title : value.title,
                    mp3 : value.audio
                });
            })
        }
    );
});