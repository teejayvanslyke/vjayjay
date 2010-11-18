vjayjay
=======

MIDI-based VJing for the web browser
------------------------------------

### Motivation

I've been looking at OpenFrameworks, Processing, etc for doing realtime music visualization at my shows, 
but my real expertise is in coding JavaScript and CSS. Why not build upon that knowledge on stage and 
create a unique live visual programming environment through a browser?

### Demo

I've recorded some Vjayjay output (har har) and put it on YouTube. The source for this project is in 
`examples/qtpi`: http://www.youtube.com/watch?v=Rog-RL-JcNM

### Requirements

* Mac OS X
* MIDI Patchbay
* Ruby 1.8.7 (the rbcoremidi gem won't compile in 1.9)
* An application or device which outputs MIDI

### Usage

1. Start MIDI Patchbay.
2. Create a patch piping all channels and all notes of an input to an output called 'Vjayjay'.
3. Copy the `blank_project` folder to another folder.
4. Run `bin/vjayjay` inside that folder.
5. Your web browser will open and begin listening to MIDI input.

The documentation is far from complete and the project is in its infancy. Here's a crash course.

#### The Vjayjay block

Listen to all events on channel 1 and output their pitch to the JavaScript console.

    // javascripts/application.js

    Vjayjay(function(vj) {
      // Listen to all events on channel 1.
      vj.listen({ channel: 1 }, function(event) {
        console.log(event.pitch);
      });
    });

#### Plugins

The code below behaves the same as the code from the previous section:

    // javascripts/library.js
    Vjayjay.plugin('logPitch', function(vj, options) {
      // Listen to all events on channel 1.
      vj.listen(options, function(event) {
        console.log(event.pitch);
      });
    });

    // javascripts/application.js
    Vjayjay(function(vj) {
      vj.plugin('logPitch', { channel: 1 });
    });


