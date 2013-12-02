/**
 * Created by flevix on 08.11.13
 * Last modified on 02.12.13.
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

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

var myPlaylist1;
var player1;
var playerID = guid();

document.write("<div id='jID' style='color: white'>PlayerID: " + playerID + "</div>");

$(document).ready(function(){
    myPlaylist1 = jPlayerCreate("1");
    player1 = $("#jquery_jplayer_1");

    player1.bind($.jPlayer.event.progress, function() {
        console.log("bind-progress");
        var status = $(this).jPlayer("getStatus");
        if (status.paused) {
            return;
        }
        var data = {
            "event":"progress",
            "event_ts": Math.round(new Date().getTime() / 1000),
            "status":status,
            "current":myPlaylist1.current
        };
        localStorage.setItem("JPdata", JSON.stringify(data));
    });
    player1.bind($.jPlayer.event.timeupdate, function() {
        console.log("bind-timeupdate");
        var status = $(this).jPlayer("getStatus");
        if (status.paused) {
            return;
        }
        var data = {
            "event":"timeupdate",
            "event_ts": Math.round(new Date().getTime() / 1000),
            "status":status,
            "current":myPlaylist1.current
        };
        localStorage.setItem("JPdata", JSON.stringify(data));
    });
    player1.bind($.jPlayer.event.play, function() {
        console.log("bind-play");
        var data = {
            "event":"play",
            "event_ts": Math.round(new Date().getTime() / 1000),
            "current":myPlaylist1.current
        };
        localStorage.setItem("JPdata", JSON.stringify(data));
    });
    player1.bind($.jPlayer.event.volumechange, function() {
        console.log("bind-volumechange");
        var volume = $(this).jPlayer("getVolume");
        var data = {
            "event":"volumechange",
            "event_ts": Math.round(new Date().getTime() / 1000),
            "volume":volume
        };
        localStorage.setItem("JPdata", JSON.stringify(data));
    });
    var data = JSON.parse(localStorage.getItem("JPdata"));
    if (data != null) {
        if (data.event == "timeupdate" || data.event == "progress" || data.event == "play") {
            $("#jquery_jplayer_1").jPlayer("updateInterface", data.status);
            myPlaylist1.select(data.current);
        }
    }
});

function playAfterDie() {
    var poll = JSON.parse(localStorage.getItem("JPdata_"));
    if (poll != null) {
        console.log("poll");
        if (poll.status == playerID) {
            $("#jquery_jplayer_1").jPlayer("play", poll.currentTime);
            console.log(poll.currentTime);
        }
    }
}

function handleStorage(e) {
    if (e.key == "JPdata" && e.newValue != null) {
        var data = JSON.parse(e.newValue);
        if (data.event == "timeupdate" || data.event == "progress") {
            $("#jquery_jplayer_1").jPlayer("updateInterface", data.status);
        } else if (data.event == "play") {
            $("#jquery_jplayer_1").jPlayer("stop");
            myPlaylist1.select(data.current);
        } else if (data.event == "seekBar") {
            $("#jquery_jplayer_1").jPlayer("playHead", data.p);
        } else if (data.event == "volumechange") {
            $("#jquery_jplayer_1").jPlayer("volume", data.volume);
        }
    } else if (e.key == "JPdata_" && e.newValue != null) {
        var poll = JSON.parse(e.newValue);
        if (poll.status == "") {
            poll.status = "" + playerID;
            localStorage.setItem("JPdata_", JSON.stringify(poll));
            setTimeout(playAfterDie, 100);
        }
    }
    console.log("handle!");
}

window.addEventListener("storage", handleStorage, false);

window.onbeforeunload = function() {
    var st = $("#jquery_jplayer_1").jPlayer("getStatus");
    if (!st.paused) {
        var poll = {
            "event":"poll",
            "event_ts": Math.round(new Date().getTime() / 1000),
            "status":"",
            "currentTime":st.currentTime
        };
        localStorage.setItem("JPdata_", JSON.stringify(poll));
    }
}