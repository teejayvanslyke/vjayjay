vjayjay
=======

MIDI-based VJing for the web browser
------------------------------------

### Motivation

I've been looking at OpenFrameworks, Processing, etc for doing realtime music visualization at my shows, 
but my real expertise is in coding JavaScript and CSS. Why not build upon that knowledge on stage and 
create a unique live visual programming environment through a browser?

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
6. Listen to MIDI and do stuff inside `javascripts/application.js`

