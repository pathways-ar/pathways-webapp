/*global navigator, MediaStreamTrack*/

//a variable video that selects the id of the element video 
var video = document.getElementById("camera");

// Linking the getusermedia API that helps access the webcam stream of the device's camera 
(navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia)

//Try to access the getUserMedia API.
if (navigator.getUserMedia && MediaStreamTrack.getSources){
    MediaStreamTrack.getSources(function(sourceInfos){
        var videosrcs = [];
        
        for (var i = 0; i < sourceInfos.length; i++)
            if (sourceInfos[i].kind == 'video')
                videosrcs.push(sourceInfos[i].id);
        
        navigator.getUserMedia(
            {video: { optional: [{sourceId: videosrcs[videosrcs.length - 1]}]}},
            stream => video.src = window.URL.createObjectURL(stream), //If user gives permission, this gives the actual webcam stream value to the variable video
            err => alert("We can't use your camera! You might have denied this app permission.\n" + err)
        );
    });
}
//If getUserMedia isn't supported in their browser, tell them.
else
    alert("We can't use your camera! Your browser doesn't support getUserMedia or MediaStreamTrack.");



