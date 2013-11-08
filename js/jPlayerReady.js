/**
 * Created by flevix on 08.11.13.
 */
$(document).ready(function(){
    $("#jquery_jplayer_1").jPlayer({
        ready : function() {
            $(this).jPlayer("setMedia", {
                mp3 : "./audio/Brutal_Whiskers_-_02_-_.mp3"
            });
        },
        swfPath : "./jPlayer",
        supplied: "mp3"
    });
});