if (window.hasOwnProperty('speechSynthesis')) {
  var synth = window.speechSynthesis;
  synth.cancel();

  createjs.Sound.on('fileload', playSong);
  var sounds = [{
    src: 'sprite.mp3',
    data: {
      audioSprite: [{
        id: 'part1',
        startTime: 0,
        duration: 1161
      }, {
        id: 'part2',
        startTime: 1161,
        duration: 2870
      }]
    }
  }];
  createjs.Sound.alternateExtensions = ['ogg'];
  createjs.Sound.registerSounds(sounds, './audio/');

  var part1 = createjs.Sound.createInstance('part1'),
    part2 = createjs.Sound.createInstance('part2');

  function playSong() {
    part1.play();

    part1.on('complete', function() {
      speakRhyme(function() {
        part2.play();
      })
    });

    part2.on('complete', function() {
      speakRhyme(function() {
        playSong();
      })
    });
  }

  function speakRhyme(cb) {
    var utterance = new SpeechSynthesisUtterance(rhyme.name);

    utterance.rate = 1.2;
    utterance.onend = function() {
      synth.cancel();
      cb();
    };

    synth.speak(utterance);
  }

}
