SPEED = 5000; // time in ms for the falling animation to complete
RATE = 100; // interval in ms at which a new image is added

var canvas = $('#canvas'),
  image = $('<img>')
    .prop('class', 'image')
    .load(function() {
      setInterval(addImage, RATE);
    });

var rhyme = randomRhyme();
image.prop('src', './img/' + rhyme.file);
var title = 'IT\'S RAINING ' + rhyme.name.toUpperCase();
$('title').text(title);
$('#pagetitle').text(title);

function addImage() {
  var clone = image.clone();
  clone.css({
    top: -image[0].height,
    left: randomRange(-image[0].width, $(window).width())
  });

  canvas.append(clone);

  clone.animate({
    top: $(window).height() + image[0].height
  }, SPEED, 'swing', function() {
    this.remove();
  })
}

function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function randomRhyme() {
  return RHYMES[Math.floor(Math.random() * RHYMES.length)]
}
