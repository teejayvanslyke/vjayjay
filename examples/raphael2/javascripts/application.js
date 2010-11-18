$(function() {
  
  var paper = Raphael(10, 50, 720, 480);

  Vjayjay(function(vj) {

    var letterIndex = 0;
    function nextLetter() { 
      if (letterIndex > 7) letterIndex = 0;
      return [ 'G', 'E', 'T', 'F', 'U', 'N', 'K', 'Y' ][letterIndex++];
    }

    function animateBackground() {
      if (iteration >= 6) iteration = 0;
      if (iteration < 3)
        background.animate({ translation: "-360 -240" }, 200);
      else if (iteration >= 3 && iteration < 6)
        background.animate({ translation: "360 240" }, 200);
      iteration++;
    }

    var smileyPath = 'M16,1.466C7.973,1.466,1.466,7.973,1.466,16c0,8.027,6.507,14.534,14.534,14.534c8.027,0,14.534-6.507,14.534-14.534C30.534,7.973,24.027,1.466,16,1.466zM16,29.534C8.539,29.534,2.466,23.462,2.466,16C2.466,8.539,8.539,2.466,16,2.466c7.462,0,13.535,6.072,13.535,13.533C29.534,23.462,23.462,29.534,16,29.534zM11.104,14c0.932,0,1.688-1.483,1.688-3.312s-0.755-3.312-1.688-3.312s-1.688,1.483-1.688,3.312S10.172,14,11.104,14zM20.729,14c0.934,0,1.688-1.483,1.688-3.312s-0.756-3.312-1.688-3.312c-0.932,0-1.688,1.483-1.688,3.312S19.798,14,20.729,14zM8.143,21.189C10.458,24.243,13.148,26,16.021,26c2.969,0,5.745-1.868,8.11-5.109c-2.515,1.754-5.292,2.734-8.215,2.734C13.164,23.625,10.54,22.756,8.143,21.189z'
    var starPath   = 'M15.999,22.77l-8.884,6.454l3.396-10.44l-8.882-6.454l10.979,0.002l2.918-8.977l0.476-1.458l3.39,10.433h10.982l-8.886,6.454l3.397,10.443L15.999,22.77L15.999,22.77z';

    var background = paper.image("images/dark-metal-texture.jpg", 0, 0, 3000, 2000);
    var smiley = paper.path(smileyPath).attr({fill: "#000", stroke: "#00", "fill-opacity": 1.0, "stroke-width": 1, "stroke-linecap": "round", translation: "360 240"});
    var bear = paper.image("images/bear.svg", 0, 0, 100, 200);
    var star = paper.path(starPath).attr({fill: "#000", stroke: "#00", "fill-opacity": 1.0, "stroke-width": 1, "stroke-linecap": "round", translation: "360 240"}).hide();

    var stars = paper.set();
    stars.push(star.clone().translate("-100 -100"));
    stars.push(star.clone().translate("100 -100"));
    stars.push(star.clone().translate("-100 100"));
    stars.push(star.clone().translate("100 100"));
    stars.hide();

    smiley.scale(5);
    vj.listen({ type: 'NoteOn', channel: 0 }, function(event)  {
      smiley.show();
      smiley.animate({ scale: 10.0 }, 50, function() {
        smiley.scale(5);
      });
    });

    vj.listen({ type: 'NoteOff', channel: 0 }, function(event)  {
        smiley.hide();
    });
    
    var palette = [ '#a839b2', '#ff0071', '#acd030', '#58aa00', '#00aa78' ];

    vj.listen({ type: 'NoteOn', channel: 1 }, function(event)  {
      smiley.attr({ fill: palette[Utility.random(palette.length - 1)] });

      animateBackground();
    });

    vj.listen({ pitch: 36, type: 'NoteOn', channel: 2 }, function(event)  {
      stars.show();
      stars.attr({ fill: palette[Utility.random(palette.length - 1)] });
      stars.attr({ scale: 10.0 });
      stars.animate({scale: 1.0}, 200);
    });

    var starRotation = 0;
    vj.listen({ pitch: 37, type: 'NoteOn', channel: 2 }, function(event)  {
      stars.animate({rotation: starRotation+=30}, 200);
    });
  });

});
