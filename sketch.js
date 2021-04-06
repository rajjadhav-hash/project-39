var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score
var survivalTime=0;
var jungle,jungleImage;
var gameState=0;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 jungleImage=loadImage("jungle.jpg");
}



function setup() {
  createCanvas(displayWidth+200,displayHeight+150);
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.3;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
  
  
}


function draw() {
  background(jungleImage);
  textSize(20);
  fill("red");
  stroke("black");
  text("Survival Time : "+survivalTime,100,50);
  fill("yellow");
  text("HINT-PRESS SPACE KEY TO JUMP",500,50);
  
 
  survivalTime=Math.round(frameCount/frameRate())
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  monkey.collide(ground);
    if(keyDown("space")&& monkey.y >=0){
     monkey.velocityY=-13;
       }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    spawnBananas();
    spawnObstacles();
       
    camera.position.x=displayWidth/2;
     camera.position.y=monkey.y;

     if(gameState === 2){
      game.update(2);
      game.end();
      textSize(25);
    fill("red");
    text("GAME OVER",120,200);
    }
    
  
  if(monkey.isTouching(obstacleGroup)){
    game.update(2);
    
  }
  
drawSprites();
  
  
  
}

  function spawnBananas(){
    if(frameCount%80===0){
      banana=createSprite(600,50,10,10);
      banana.y=Math.round(random(120,200));
      banana.addImage(bananaImage);
      banana.scale=0.2;
      banana.velocityX=-5;
      banana.lifetime=175;
      bananaGroup.add(banana);
    }
  }
  function spawnObstacles(){
    if (frameCount % 300 === 0) {
    var obstacle = createSprite(500, 330, 23, 32);
    obstacle.velocityX = -3;
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
    obstacleGroup.setLifetimeEach=100;
    
  }
}
