$(function() {
  

  Vjayjay.scene('intro', function(scene, options) {
    scene.setup(function(vj) {
      vj.palette = [ '#a839b2', '#ff0071', '#acd030', '#58aa00', '#00aa78' ] ;
      vj.patch('raphael', { top: 10, left: 10, width: 720, height: 480 });
      vj.patch('animatedBackground', {
        image: "images/dark-metal-texture.jpg",
        trigger: { channel: 0, pitch: 61 },
        kill: { channel: 0, pitch:59 }
      });
      vj.patch('throbbingBoombox', { channel: 0});
      vj.patch('bars2', {});
      vj.patch('karaokeWords', { 
        trigger: { type: 'NoteOn', channel: 4 },
        text: "KEEP ME BOOMIN' IN YA SYSTEM"
      });
      vj.patch('karaokeWords', { 
        trigger: { type: 'NoteOn', channel: 5 },
        text: "LET'S GO"
      });
    });

    scene.teardown(function(vj) {
    });
  });

  Vjayjay.scene('bridge', function(scene, options) {
    scene.setup(function(vj) {
      vj.palette = [ '#a839b2', '#ff0071', '#acd030', '#58aa00', '#00aa78' ] ;
      vj.patch('raphael', { top: 10, left: 10, width: 720, height: 480 });
      vj.patch('animatedBackground', {
        image: "images/blue-ice.jpg",
        trigger: { channel: 0, pitch: 61 },
        kill: { channel: 10, pitch:59 }
      });
    });
  });

  Vjayjay(function(vj) {
    //vj.patch('debug');
    vj.listen({ type: 'NoteOn', channel: 15, pitch: 0 }, function(event) {
      vj.scene('intro');
    });
    vj.listen({ type: 'NoteOn', channel: 15, pitch: 1 }, function(event) {
      vj.scene('bridge');
    });
  });

});
