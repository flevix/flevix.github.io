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
    var myPlaylist2 = jPlayerCreate("2");
    var player1 = $("#jquery_jplayer_1");
    player1.bind($.jPlayer.event.ended, function() {
        console.log("bind-ended");
        var id = myPlaylist1.current - 1;
        var song = {
            title:myPlaylist1.playlist[id].title,
            mp3:myPlaylist1.playlist[id].mp3
        };
        myPlaylist1.add(song);
        myPlaylist1.remove(id);
    });
    player1.bind($.jPlayer.event.progress, function() {
        console.log("bind-progress");
        var status = $(this).jPlayer("getStatus");
        $(this).jPlayer("updateOthersInterface", status);

        var data = {
            "event":"progress",
            "event_ts": Math.round(new Date().getTime() / 1000),
            "status":status
        }
        localStorage.setItem("JPdata", JSON.stringify(data));
    });
    player1.bind($.jPlayer.event.timeupdate, function(event) {
        console.log("bind-timeupdate");
        var status = $(this).jPlayer("getStatus");
        $(this).jPlayer("updateOthersInterface", status);

        var data = {
            "event":"timeupdate",
            "event_ts": Math.round(new Date().getTime() / 1000),
            "status":status
        }
        localStorage.setItem("JPdata", JSON.stringify(data));
    });
    player1.bind($.jPlayer.event.play, function() {
        console.log("bind-play");
    });
    //---

});
