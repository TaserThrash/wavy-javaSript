
class Thing{
  constructor(name, y, count){
    this.name = name;
    this.count = count;
    this.y = y;
    this.ref = database.ref("gameState");
  }

  show(){
    let out = this.name + " " + this.count;
    text(out, 40, 40 + this.y * 20);
  }

  changeCount(x){
    this.count += x;
    if(this.count < 0){
      this.count = 0;
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  database = firebase.database();
}

let inventory = [];
let y = 0;
let title = "";
let count = 0;

function makeItem(name){
  inventory.push(new Thing(name, inventory.length, 0));
}

function draw() {
  textSize(20);
  background(220);
  fill('red');
  rect(0, y * 20 + 20 + 5, 200, 20);
  fill('black');
  for(let i of inventory){
    i.show();
  }
  line(300, 200, 300 + title.length * 12, 200)
  text(title, 300, 200);
}

function keyPressed(){
  if(keyCode == DOWN_ARROW || keyCode == UP_ARROW){
    if(y > 0 && keyCode == UP_ARROW){
      y--;
    }
    else if(keyCode == DOWN_ARROW){
      y++;
    }
  }
  else if(key == '-' || key == '='){
    inventory[y].changeCount((key == '=') - (key == '-'));
  }
  else if(keyCode == RETURN){
    makeItem(title);
    title = "";
  }
  else{
    if(key.length == 1){
      title += key;
    }
    if(key == "Backspace"){
      title = title.slice(0, -1);
    }
  }
}
