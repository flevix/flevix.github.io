/**
 * Created by flevix on 08.11.13.
 */
$(document).ready(function(){
    $("#jquery_jplayer_1").jPlayer({
        ready : function() {
            $(this).jPlayer("setMedia", {
                oga : "./audio/DefianceNew.ogg"
            });
        },
        swfPath : "./jPlayer",
        supplied : "oga"
    });
});