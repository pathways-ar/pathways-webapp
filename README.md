# pathways
Project for HackTheNorth 2016 ([on DevPost](http://devpost.com/software/pathways-ifbzkd)). By Clive Chan, Riya Walia, and Yash Mathur.

A JavaScript Webapp projecting augmented-reality Google Maps directions, locations, and other information onto your surroundings.

## Inspiration
We're 1A freshmen, and it's always hard getting around the new campus. Often, the tool of choice is Google Maps, but all it displays is a little blue dot in a sea of various buildings in shades of tan and grey. Instead of giving us the overhead view of the map, what if we could get our directions in a more natural way?

## What it does
Our webapp displays the surroundings, with a canvas overlay painted on top to indicate directions. A textbox can be used to enter a destination, and all waypoints are calculated and returned as a path.

## Challenges I ran into
The first attempt at getting phone orientation used the gyroscope sensors, which ended up being extremely unstable.

The second attempt used image flow, which was not able to extract enough information from the image to properly align the arrow with the surroundings.

Browser compatibility is difficult to work around, especially for newer mobile sensor APIs. Additionally, augmented reality is difficult to implement properly, and most of the libraries are poorly documented.

## Accomplishments that I'm proud of
Accessing the camera and painting a canvas on top of it using getUserMedia() API, measuring the orientation, and using the Google Maps API to retrieve coordinates. Though we weren't able to connect these two ends of the project, we're happy that we were able to make so much progress!

## What's next for Pathways
We'd love to take this further in the future! Eventually we hope to take this to three dimensions. Eventually we may move to native app (rather than a webapp) allowing us greater speed, better phone hardware access, and tools like Unity. We'll also be reading up heavily on augmented reality algorithms and techniques, and try to use phone sensors to better detect orientation.
