Vajayjay.plugin('animatedMetalBackground', function(vj) {
  var iteration = 0;
  vj.listen({ type: 'NoteOn', channel: 1 }, function(event)  {
    animateBackground();
  });
}


