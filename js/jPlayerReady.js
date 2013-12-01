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

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
};

function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

var myPlaylist1;
var myPlaylist2;
var playerID = guid();

$(document).ready(function(){
    myPlaylist1 = jPlayerCreate("1");
    myPlaylist2 = jPlayerCreate("2");
    var player1 = $("#jquery_jplayer_1");
    var player2 = $("#jquery_jplayer_2");

    player1.bind($.jPlayer.event.progress, function() {
        console.log("bind-progress");
        var status = $(this).jPlayer("getStatus");
        $(this).jPlayer("updateOthersInterface", status);

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
        $(this).jPlayer("updateOthersInterface", status);

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
        myPlaylist2.select(myPlaylist1.current);
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
    player1.bind($.jPlayer.event.seeking, function() {
        console.log("bind-seeking");
    });
    player1.bind($.jPlayer.event.seeked, function() {
        console.log("bind-seeked");
    });
    var data = JSON.parse(localStorage.getItem("JPdata"));
    if (data.event == "timeupdate" || data.event == "progress") {
        myPlaylist1.select(data.current);
        myPlaylist2.select(data.current);
    }
});

document.write("PlayerID " + playerID);

function playAfterDie() {
    var poll = JSON.parse(localStorage.getItem("JPdata_"));
    if (poll.status == playerID) {
        $("#jquery_jplayer_1").jPlayer("play", poll.currentTime);
    }
    localStorage.removeItem("JPdata_");
}

function handleStorage() {
    var data = JSON.parse(localStorage.getItem("JPdata"));
    if (data.event == "timeupdate" || data.event == "progress") {
        $("#jquery_jplayer_1").jPlayer("updInterf", data.status);
        $("#jquery_jplayer_2").jPlayer("updInterf", data.status);
    } else if (data.event == "play") {
        $("#jquery_jplayer_1").jPlayer("stop");
        $("#jquery_jplayer_2").jPlayer("stop");
        myPlaylist1.select(data.current);
        myPlaylist2.select(data.current);
    } else if (data.event == "seekBar") {
        $("#jquery_jplayer_1").jPlayer("playHead", data.p);
        $("#jquery_jplayer_2").jPlayer("playHead", data.p);
    } else if (data.event == "volumechange") {
        $("#jquery_jplayer_1").jPlayer("volume", data.volume);
        $("#jquery_jplayer_2").jPlayer("volume", data.volume);
    }
    var poll = JSON.parse(localStorage.getItem("JPdata_"));
    if (poll != null) {
        if (poll.status == 0) {
            poll.status = playerID;
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
            "status":0,
            "currentTime":st.currentTime
        };
        localStorage.setItem("JPdata_", JSON.stringify(poll));
    }
}
//
//window.onunload = function() {
//    var data = {
//        "event":"die",
//        "event_ts": Math.round(new Date().getTime() / 1000),
//        "status":{}
//    };
//    localStorage.setItem("JPdata_", JSON.stringify(data));
//}