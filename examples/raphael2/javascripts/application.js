$(function() {
  

  Vjayjay(function(vj) {

    vj.palette = [ '#a839b2', '#ff0071', '#acd030', '#58aa00', '#00aa78' ] ;
    vj.plugin('raphael', { top: 10, left: 10, width: 720, height: 480 });
    vj.plugin('animatedMetalBackground', { type: 'NoteOn', channel: 1 });
    vj.plugin('animatedFieldBackground', { type: 'NoteOn', channel: 4 });
    vj.plugin('pulsatingSmiley', {
      showOn:         { type: 'NoteOn', channel: 0 },
      hideOn:         { type: 'NoteOff', channel: 0 },
      changeColorOn:  { type: 'NoteOn', channel: 1 }
    });
    vj.plugin('rotatingStars', {
      pulseOn: { pitch: 36, type: 'NoteOn', channel: 2 },
      rotateOn: { pitch: 37, type: 'NoteOn', channel: 2 }
    });
    vj.plugin('bars', {
    });

//var bear = vj.raphael.image("images/bear.svg", 0, 0, 100, 200);

  });

});
