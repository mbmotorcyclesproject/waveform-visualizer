let sound;
let fft;
let loaded = false;
let playing = false;

function preload() {
  // ✅ Use RAW GitHub URL here
  sound = loadSound("https://github.com/mbmotorcyclesproject/waveform-visualizer/blob/main/07020209.wav", () => {
    loaded = true;
    console.log("Audio loaded");
  }, () => {
    console.error("Failed to load sound");
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

  if (!loaded) {
    fill(255);
    text("Loading audio...", width / 2, height / 2);
    return;
  }

  if (!playing) {
    fill(255);
    text("Click to play audio", width / 2, height / 2);
    return;
  }

  // ✅ Animate waveform
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

// ✅ Click canvas to toggle play/pause
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
function preload() {
  sound = loadSound("07020209.wav", () => {
    loaded = true;
    console.log("Audio loaded");
  }, () => {
    console.error("Failed to load sound");
  });
}

