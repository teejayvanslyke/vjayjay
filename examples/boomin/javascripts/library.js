Vjayjay.patch('debug', function(vj, options) {
  vj.listen({}, function(event) {
    console.log(event.type + " | C" + event.channel + " | P "+event.pitch+" | V "+event.velocity+"|")
  });
});

Vjayjay.patch('raphael', function(vj, options) {
  if (vj.raphael) {
    vj.raphael.clear();
  } else {
    vj.raphael = Raphael(options.top, options.left, options.width, options.height);
  }
});

Vjayjay.patch('animatedBackground', function(vj, options) {
  var background = vj.raphael.image(options.image, 0, 0, 3000, 2000);
  var iteration = 0;
  vj.listen(options.trigger, function(event)  {
    if (iteration >= 6) iteration = 0;
    if (iteration < 3)
    background.animate({ translation: "-360 -240" }, 200);
    else if (iteration >= 3 && iteration < 6)
    background.animate({ translation: "360 240" }, 200);
  iteration++;
  });
  vj.listen(options.kill, function(event) {
    background.hide();
  });
});

Vjayjay.patch('animatedFieldBackground', function(vj, options) {
  var background = vj.raphael.image("images/field.jpg", 0, 0, 1680/2, 1050/2);
  background.hide();
  background.attr({opacity: 0.2});
  var iteration = 0;
  vj.listen($.extend({}, options, {pitch: 36}), function(event)  {
    background.show();
    background.animate({ scale: 2.0 }, 1000, function() {
      background.attr({scale: 1.0});
    });
  });
  vj.listen($.extend({}, options, { pitch: 37 }), function(event)  {
    background.animate({ scale: 10.0 }, 5000, function() {
      background.attr({scale: 1.0});
    });
  });
});

Vjayjay.patch('animatedGalaxyBackground', function(vj, options) {
  var background = vj.raphael.image("images/BlkGalaxySmall.jpg", 0, 0, 2848, 2136);
  var iteration = 0;
  vj.listen(options, function(event)  {
    if (iteration >= 6) iteration = 0;
    if (iteration < 3)
    background.animate({ translation: "-360 -240" }, 200);
    else if (iteration >= 3 && iteration < 6)
    background.animate({ translation: "360 240" }, 200);
  iteration++;
  });
});

Vjayjay.patch('pulsatingSmiley', function(vj, options) {
  var smileyPath = 'M16,1.466C7.973,1.466,1.466,7.973,1.466,16c0,8.027,6.507,14.534,14.534,14.534c8.027,0,14.534-6.507,14.534-14.534C30.534,7.973,24.027,1.466,16,1.466zM16,29.534C8.539,29.534,2.466,23.462,2.466,16C2.466,8.539,8.539,2.466,16,2.466c7.462,0,13.535,6.072,13.535,13.533C29.534,23.462,23.462,29.534,16,29.534zM11.104,14c0.932,0,1.688-1.483,1.688-3.312s-0.755-3.312-1.688-3.312s-1.688,1.483-1.688,3.312S10.172,14,11.104,14zM20.729,14c0.934,0,1.688-1.483,1.688-3.312s-0.756-3.312-1.688-3.312c-0.932,0-1.688,1.483-1.688,3.312S19.798,14,20.729,14zM8.143,21.189C10.458,24.243,13.148,26,16.021,26c2.969,0,5.745-1.868,8.11-5.109c-2.515,1.754-5.292,2.734-8.215,2.734C13.164,23.625,10.54,22.756,8.143,21.189z';
  var smiley = vj.raphael.path(smileyPath).attr({fill: "#000", stroke: "#00", opacity: 0.7, "fill-opacity": 0.5, "stroke-width": 3, "stroke-linecap": "round", translation: "360 240"});
  smiley.scale(5);
  vj.listen(options.showOn, function(event)  {
    smiley.show();
    smiley.animate({ scale: 10.0 }, 50, function() {
      smiley.scale(5);
    });
  });

  vj.listen(options.hideOn, function(event)  {
    smiley.hide();
  });

  vj.listen(options.changeColorOn, function(event)  {
    smiley.attr({ stroke: vj.palette[Utility.random(vj.palette.length - 1)] });
  });
});


Vjayjay.patch('rotatingStars', function(vj, options) {
  var starPath   = 'M15.999,22.77l-8.884,6.454l3.396-10.44l-8.882-6.454l10.979,0.002l2.918-8.977l0.476-1.458l3.39,10.433h10.982l-8.886,6.454l3.397,10.443L15.999,22.77L15.999,22.77z';

  var star = vj.raphael.path(starPath).attr({fill: "#000", stroke: "#00", "fill-opacity": 1.0, "stroke-width": 1, "stroke-linecap": "round", translation: "360 240"}).hide();

  var stars = vj.raphael.set();
  stars.push(star.clone().translate("-100 -100"));
  stars.push(star.clone().translate("100 -100"));
  stars.push(star.clone().translate("-100 100"));
  stars.push(star.clone().translate("100 100"));
  stars.hide();

  vj.listen(options.pulseOn, function(event)  {
    stars.show();
    stars.attr({ fill: vj.palette[Utility.random(vj.palette.length - 1)] });
    stars.attr({ scale: 10.0 });
    stars.animate({scale: 1.0}, 200);
  });

  var starRotation = 0;
  vj.listen(options.rotateOn, function(event)  {
    stars.animate({rotation: starRotation+=30}, 200);
  });
});

Vjayjay.patch('bars', function(vj, options) {
  var index = 0;
  var rect = vj.raphael.rect(0, 0, 100, 480);
  rect.hide();
  vj.listen({ type: 'NoteOn', channel: 3 }, function(event) {
    if (index > palette.length - 1) {
      index = 0;
      rect.remove();
      rect = vj.raphael.rect(0, 0, 100, 480);
    }
    rect.attr({ opacity: 0.1, fill: vj.palette[index++] });
    rect.show();
    rect.animate({translation: "100 0"});
  });
});

Vjayjay.patch('throbbingBoombox', function(vj, options) {
  var background = vj.raphael.image("images/boombox.svg", 0, 0, 1680/2, 1050/2);
  background.hide();
  var iteration = 0;
  vj.listen($.extend({}, options, {type: 'NoteOn'}), function(event)  {
    background.show();
    background.animate({ scale: 2.0 }, 50, function() {
      background.attr({scale: 1.0});
    });
  });
  vj.listen($.extend({}, options, {type: 'NoteOn', pitch: 62}), function(event)  {
    background.hide();
  });
  vj.listen($.extend({}, options, { type: 'NoteOff' }), function(event)  {
    background.attr({scale: 1.0});
  });
});

Vjayjay.patch('bars2', function(vj, options) {
  var index = 0;
  var rect = vj.raphael.rect(0, 0, 100, 480);
  rect.hide();
  vj.listen({ type: 'NoteOn', channel: 3 }, function(event) {
    if (index > palette.length - 1) {
      index = 0;
      rect.remove();
      rect = vj.raphael.rect(0, 0, 100, 480);
    }
    rect.attr({ opacity: 0.5, fill: vj.palette[index++] });
    rect.show();
    rect.animate({opacity: 0}, 100);
    rect.animate({translation: "100 0"});
  });
});

Vjayjay.patch('karaokeWords', function(vj, options) {
  var words = options.text.split(' ');
  var currentWordIndex = 0;

  vj.listen(options.trigger, function(event) {
    if (currentWordIndex > words.length - 1) currentWordIndex = 0;
    var word = words[currentWordIndex++];
    var text = vj.raphael.text(360, 360,
                               word);
                               text.attr({fill: '#fff', 'font-family': 'Futura', 'font-size': 100});
                               text.animate({ opacity: 0 }, 200);
  });
});
