$(function() {

  var paper = Raphael(10, 50, 720, 480);
  var circles = {};

  Vjayjay(function(vj) {

    vj.listen({ type: 'NoteOn', channel: 0 }, function(event) {
      var circle = paper.circle(Utility.random(720), Utility.random(480), event.pitch);
      circle.attr('fill', '#b66');
      circles['pitch_' + event.pitch] = circle;
    });

    vj.listen({ type: 'NoteOff', channel: 0 }, function(event) {
      var circle  = circles['pitch_' + event.pitch];
      circle.animate({ opacity: '0.0' }, 200, function() { circle.remove(); });
    });

    var letterIndex = 0;
    function nextLetter() { 
      if (letterIndex > 7) letterIndex = 0;
      return [ 'G', 'E', 'T', 'F', 'U', 'N', 'K', 'Y' ][letterIndex++];
    }

    var letter = paper.path("M0,0L0,0z").attr({fill: "#000", stroke: "#00", "fill-opacity": .3, "stroke-width": 1, "stroke-linecap": "round", translation: "100 100"});
    vj.listen({ type: 'NoteOn', channel: 1 }, function(event) {
      letter.animate({path: helvetica[nextLetter()], translation: "200 200"}, 200);
    });

  });

});
