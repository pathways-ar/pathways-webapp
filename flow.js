/*global oflow, $*/

var flow = new oflow.VideoFlow($('video').get(0));

var canvas = document.getElementById('overlay');
var context = canvas.getContext('2d');
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
var radius = 40;

flow.onCalculated(function(f){
    //console.log("X: ", f.u);
    //console.log("Y: ", f.v);
    //console.log("div: ", f.div); //positive is moving closer
    //console.log("curl: ", f.curl); //positive is counterclockwise
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.translate(canvas.width/2, canvas.height/2);
    context.rotate(f.curl/100);
    context.scale(f.div/100,f.div/100);
    context.translate(-canvas.width/2, -canvas.height/2);
    context.translate(f.u, f.v);
    context.clearRect(0,0,canvas.width,canvas.height);
    context.rect(canvas.width/2,canvas.height/2,50,50);
    context.fillStyle = 'blue';
    context.fill();
});

flow.startCapture();
