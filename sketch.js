let sound;
let fft;
let loaded = false;
let playing = false;

function preload() {
  sound = loadSound("https://github.com/mbmotorcyclesproject/MBMP-home/blob/main/07020209.wav", () => {
    loaded = true;
  });
}

function setup() {
  createCanvas(800, 300);
  fft = new p5.FFT();
  textAlign(CENTER, CENTER);
  background(0);
}

function draw() {
  background(0);
  fill(255);

  if (!loaded) {
    text("Loading audio...", width / 2, height / 2);
    return;
  }

  if (!playing) {
    text("Click to play audio", width / 2, height / 2);
    return;
  }

  // Draw waveform
  let waveform = fft.waveform();
  stroke(0, 255, 0);
  noFill();
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, 0, height);
    vertex(x, y);
  }
  endShape();
}

function mousePressed() {
  if (!loaded) return;

  if (!playing) {
    sound.play();
    playing = true;
  } else {
    sound.pause();
    playing = false;
  }
}
