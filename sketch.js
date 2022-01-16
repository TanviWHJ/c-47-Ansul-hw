var jake,jakeImage;
var ghost,vampire,ghostImage,ghost1Image,ghost2Image,vampire1Image;
var bg,bgImage;
var coin,coinImage,obstaclesGroup,coinGroup;
var invisibleGround;
var restart,restartImage;
var gameOver,gameOverImage;
var play=1;
var end=2;
var gameState=1;

function preload(){
    jakeImage=loadImage("sprites/jake.png.png");

    ghostImage=loadImage("sprites/ghost.png");
   ghost1Image=loadImage("sprites/ghost1.png");
   ghost2Image=loadImage("sprites/ghost2.png");

   vampire1Image=loadImage("sprites/vampire1.png")

    bgImage=loadImage("sprites/bg1.jpg");

    coinImage = loadImage("sprites/coin.png");

restartImage = loadImage("sprites/restart.png");

gameOverImage = loadImage("sprites/game over.jpg")
}


function setup() {
  createCanvas(1000,700);
 // createSprite(400, 200, 50, 50);


 bg = createSprite(700,350,1200,700);
bg.addImage("running",bgImage);
bg.scale=3;
bg.velocityX=-7;

 jake = createSprite(100,430,20,50);
jake.addImage("running",jakeImage);
 jake.scale=0.3;

 invisibleGround = createSprite(500,570,1000,10);
  invisibleGround.visible = false;
 
 obstaclesGroup=createGroup();
 coinGroup=createGroup();

 gameOver=createSprite(500,300,20,20);
 gameOver.addImage(gameOverImage);
 gameOver.visible=false;

 restart=createSprite(500,600,20,20);
 restart.scale=0.5;
 restart.addImage(restartImage);
 restart.visible=false;
}

function draw() {
  background(255);  
  
  if (gameState===1) {
    
    if (bg.x < 0){
    bg.x = bg.width/2;
  }

  console.log(invisibleGround.y);

  if(keyDown("space") && jake.y>=300) {
    jake.velocityY = -12;
   }
   
   
spawnCoins();
spawnObstacles();

if(obstaclesGroup.isTouching(jake)){
gameState=2;

}
  }


  else if (gameState === 2) {
    gameOver.visible = true;
    restart.visible = true;
   
   //change the trex animation
    //trex.changeAnimation("collided", trex_collided);
  
    obstaclesGroup.setVelocityXEach(0);
    coinGroup.setVelocityXEach(0);
   
    obstaclesGroup.destroyEach();
    coinGroup.destroyEach();
    bg.velocityX = 0;
    jake.velocityY = 0

   }
  jake.velocityY = jake.velocityY + 1.0;

   jake.collide(invisibleGround)

  drawSprites();
}

function spawnCoins() {
  //write code here to spawn the coins
  if (frameCount % 200 === 0) {
    var coin = createSprite(1000,750,40,10);
    coin.y = Math.round(random(210,420));
    coin.addImage(coinImage);
    coin.scale = 0.2;
    coin.velocityX = -5;
    
     //assign lifetime to the variable
    coin.lifetime = 333.3;
    
    //adjust the depth
    coin.depth =jake.depth;
    jake.depth = jake.depth + 1;
    
    //add each coin to the group
    coinGroup.add(coin);
  }
  }


  function spawnObstacles(){
    if (frameCount % 150 === 0){
      var obstacle = createSprite(1000,500,10,40);
      obstacle.velocityX = -6
       //generate random obstacles
       var rand = Math.round(random(1,4));
       console.log(rand)
       switch(rand) {
         case 1: obstacle.addImage(ghostImage);
                 break;
                  case 2: obstacle.addImage(vampire1Image);
                 break;
         case 3: obstacle.addImage(ghost1Image);
                 break;
         case 4: obstacle.addImage(ghost2Image);
                 break;
         /*case 5: obstacle.addImage(vampireImage);
                 break;       
         case 6: obstacle.addImage(obstacle6);
                 break;*/
         default: break;
       }
      
       //assign scale and lifetime to the obstacle           
       obstacle.scale = 0.3;
       obstacle.lifetime = 300;
      
      //add each obstacle to the group
       obstaclesGroup.add(obstacle);
       
    }
   }