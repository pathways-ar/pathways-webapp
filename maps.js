/*global $*/

$.getJSON("https://maps.googleapis.com/maps/api/directions/json", {
    origin: "Disneyland",                           //GET CURRENT LOCATION.
    destination: "Universal Studios Hollywood",     //FROM INPUT BOX.
    key: "AIzaSyDfvQr_Z4eE2BKUxYE-u6tIt9GV_yhoIj8"
}, function(json){
    json.routes.forEach(function(route){
        //print "Begin route"
        route.legs.forEach(function(leg){
            //print leg.html_instructions
        });
        //print "End route"
    });
});
