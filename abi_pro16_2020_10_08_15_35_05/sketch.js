var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var PLAY=1;
var END=0;
var gameState=PLAY;
var obstacles;



function preload(){
  
  
  monkeyImage =        loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  stopImage = loadImage("sprite_1.png");
 
}

   

function setup() 
 {
  
     monkey = createSprite(80,315,20,20);
     monkey.addAnimation("monkey",monkeyImage);
     monkey.scale = 0.1;

      survivalTime = 0;
      
     ground = createSprite(400,350,900,10);
     ground.velocityX = -6;
    console.log(ground.x)

   bananaGroup= new Group(); 
    obstaclesGroup = new Group();
 }


function draw() 
 {
    
     createCanvas(600,400);
     background("blue");
    ground.x = ground.width/2;       
   monkey.collide(ground);
     monkey.setCollider("rectangle",10,20,300,500);
   
 if (gameState === PLAY)
   {
      survivalTime = survivalTime + Math.round(frameCount%30 === 0);
          
      if (keyDown("space") )
        {
           monkey.velocityY =-12 ;
        }  
      monkey.velocityY =  monkey.velocityY+0.5;
      
      if (bananaGroup.isTouching(monkey))
       {
          bananaGroup.destroyEach();
         
       }  
  
      
      food();
      obstacles();
      
   } 
  
      if (obstaclesGroup.isTouching(monkey))
        {
           gameState = END;
           monkey.addImage("monkey",stopImage);
        }
  
      if (gameState === END)
        {
           monkey.velocityY = 0;
           ground.velocityX = 0;
           stroke("white");
           textSize(20);
           fill("white");
           text("game over",500,50);
           obstaclesGroup.setVelocityXEach(0);
           bananaGroup.setVelocityXEach(0);
           obstaclesGroup.setLifetimeEach(-1);
           bananaGroup.setLifetimeEach(-1);
        }
   
  
    drawSprites();
   stroke("black");
    textSize(20);
    fill("black");
    
    text("survivaltime:"+survivalTime,225,40);
  
    
 }

function food ()
 {
   if (frameCount%110 === 0)
     {
         banana = createSprite(600,200,20,20);
         banana.velocityX = -(5+survivalTime/5);
         banana.addImage("banana",bananaImage);
         banana.scale = 0.1;
         banana.lifetime = 115;
         bananaGroup.add(banana);
     }   
 }

function obstacles ()
 {
    if (frameCount%210 === 0)
      {
       obstacle = createSprite(400,310,20,20);
        obstacle.velocityX = -(5+survivalTime/5);
         obstacle.addImage("obstacle",obstacleImage);
        obstacle.scale = 0.2;
        obstacle.lifetime = 115;
        obstaclesGroup.add(obstacle);
      }
 }
