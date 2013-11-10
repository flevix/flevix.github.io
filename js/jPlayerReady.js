/**
 * Created by flevix on 08.11.13.
 */
$(document).ready(function(){
    var cssSelector = {
        jPlayer: "#jquery_jplayer_N",
        cssSelectorAncestor: "#jp_container_N"
    };
    var options = {
        swfPath : "./jPlayer",
        supplied : "mp3"
    };
    var playlist = [];

    var myPlaylist = new jPlayerPlaylist(cssSelector, playlist, options);

    $.getJSON("./JSON/playlist.json",
        function(data) {
            $.each(data["data"].tracks, function(index, value) {
                myPlaylist.add({
                    title : value.title,
                    mp3 : value.audio
                });
            })
        }
    );
});