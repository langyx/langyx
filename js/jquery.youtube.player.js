// Strict Mode
"use strict";

// Create player script
var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/player_api';

// Add Scrtpt to the document scripts 
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Configure the player
var tv,
    playerDefaults = {
        autoplay: 0,
        autohide: 1,
        modestbranding: 0,
        rel: 0,
        showinfo: 0,
        controls: 0,
        disablekb: 1,
        enablejsapi: 0,
        iv_load_policy: 3
    };
	
// Add youtbue video id
var vid = [{
            'videoId': $("#tv").attr("data-video-id"),
            'startSeconds': $("#tv").attr("data-video-start-from"),
            'endSeconds': $("#tv").attr("data-video-end-to"),
            'suggestedQuality': 'hd720',
        }
    ],
    randomVid = Math.floor(Math.random() * vid.length),
    currVid = randomVid;

// Youtube API Ready
function onYouTubePlayerAPIReady() {
    tv = new YT.Player('tv', {
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        playerVars: playerDefaults
    });
}

// Youtube Player Ready
function onPlayerReady() {
    tv.loadVideoById(vid[currVid]);
    tv.mute();
}

// Youtube Player State Change
function onPlayerStateChange(e) {
    if (e.data === 1) {
        $('#tv').addClass('active');
    } else if (e.data === 2) {
        $('#tv').removeClass('active');
        if (currVid === vid.length - 1) {
            currVid = 0;
        } else {
            currVid++;
        }
        tv.loadVideoById(vid[currVid]);
        tv.seekTo(vid[currVid].startSeconds);
    }
}

// Resize the video to fit the size of the screen
function vidRescale(){
	var w = $(window).width(),
		h = $(window).height();

	if (w/h > 16/9){
		tv.setSize(w, w/16*9);
		$('.lx-youtube-background .lx-youtube-screen').css({'left': '10px'});
	} else {
		tv.setSize(h/9*16, h);
		$('.lx-youtube-background .lx-youtube-screen').css({'left': -($('.lx-youtube-background .lx-youtube-screen').outerWidth()-w)/2});
	}
}

// Window load event
$(window).on('load resize', function(){
	vidRescale();
});