function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(10);

  for(let i = 0; i < 180; i++){
    Sin.push(sin(radians(i * 2)));
  }
}

let t = 0;

let s = 3;

let Sin = [];

function draw() {
  scale(s);
  background(220);
  t += 10;
  translate(0, -height);

  pixels = createImage(width, height);
  pixels.loadPixels();

  for(let x = 1; x < width / 2; x+=s){
    for(let y = 0; y < height; y+=s){
      let d = (x ** 2 + (y - height / 2) ** 2) ** 0.5 / s;
      let z = y + Sin[int(d * 4 + t) % 180] * 8;
      pixels.set((-x + width / 2) / s, z / s, 0);
      pixels.set((x  + width / 2) / s, z / s, 0);
    }
  }

  pixels.updatePixels();
  image(pixels, 0, height, width, height);
}