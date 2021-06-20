var PLAY =1
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var obstaclesGroup;
var ground;
var score = 0;
function preload(){ 
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  gameOverImg=loadImage("gameover-removebg-preview.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(600, 300);
  
  var message = "This is a message";
 console.log(message) 

  monkey=createSprite(50,220,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.080;

  gameOver = createSprite(400,150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  
  ground=createSprite();
  ground.x=ground.width/2;
  ground.visible=false;
  
   
}


function draw() {
background("lightBlue");
  
  
textSize(20);
fill("#FFF700");
text("Score: "+ score,30,50);

  if (gameState === PLAY){
    gameOver.visible = false;
     ground.velocityX = -(4 + 3* score/10)
     ground=createSprite(400,250,900,10);
  ground.x=ground.width/2;
  console.log(ground.x);
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
    spawnFood();
  ground.shapeColor="green";
   obstacleGroup();
    if(keyDown("space")) {
        monkey.velocityY -=10; 
    }
     monkey.velocityY = monkey.velocityY + 0.9;
    monkey.collide(ground);  

if(obstaclesGroup.isTouching(monkey)){
  gameState = END;
}

  } else if(gameState === END){
    gameOver.visible=true;    
  monkey.visible=false;
  FoodGroup.setVelocityXEach(0);
   monkey.velocityX=0;
  FoodGroup.setLifetimeEach(-1);
 ground.velocityX = 0;
  obstacleGroup.setVelocityXEach(0);     
  obstaclesGroup.setLifetimeEach(-1);
  foodGroup.destroyEach(); 
  obstaclesGroup.destroyEach();
  }
  drawSprites();
}

function obstacleGroup(){
  if (frameCount % 60 === 0){
   var obstacle = createSprite(600,230,10,40);
   obstacle.velocityX = -(6 + SurvivalTime/30);
    obstacle.scale = 0.080;
    obstacle.lifetime = 300;
    obstacle.addImage(obstacleImage);
    obstaclesGroup.add(obstacle);
}

}

function spawnFood(){
  if(frameCount%80===0){
  var banana = createSprite(600,80,10,40);
   banana.velocityX = -(6 + SurvivalTime/30);
    banana.scale = 0.080;
    banana.lifetime = 300;
    banana.addImage(bananaImage);
    banana.y=Math.round(random(50,205));
     vg=Math.round(random(1,4));
     foodGroup.add(banana);
  }
 }
