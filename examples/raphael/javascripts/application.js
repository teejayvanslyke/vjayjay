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

  });

});
