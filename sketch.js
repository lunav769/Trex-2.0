var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudImage;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var obstacles;
var score=0;
var score;
var obstaclesGroup,cloudsGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadAnimation("dog.png");
  
  groundImage = loadImage("ground2.png");
  cloudImage  = loadImage("cloud.png");
 
  obstacle1= loadImage("obstacle1.png");
  obstacle2= loadImage("obstacle2.png");
  obstacle3= loadImage("obstacle3.png");
  obstacle4= loadImage("obstacle4.png");
  obstacle5= loadImage("obstacle5.png");
  obstacle6= loadImage("obstacle6.png");
}

function setup() {

  createCanvas(600,200)
  
  //crear sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.debug=false;
  trex.setCollider("circle",0,0,40)
  //crear sprite de suelo
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameObear=createSprite(300,100);
  gameObear.addImage(gameObearImg);

  restart=createSprite(300,140);
  restart.addImage(restartImg);
  //crear sprite de suelo invisible
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //generar números aleatorios
  obstaclesGroup=new Group();
  cloudsGroup=new Group();

}

function draw() {
  //establecer color de fondo
  background("pink");
  text("puntuación"+score,500,50);
  
  if(gameState === PLAY){
    ground.velocityX = -4; 
    score=score+Math.round(frameCount/60);
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -10;
    }
    
    trex.velocityY = trex.velocityY + 0.8
    spawnClouds();
  spamobstacles();
  if (obstaclesGroup.isTouching(trex)){
    gameState=END
  }
  }
  else if(gameState=== END){
    ground.velocityX = 0;
    trex.velocityY=0;
    trex.changeAnimation( "collided",trex_collided);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
  }
  
  
  
  //hacer que el trex salte al presionar la barra espaciadora
  
  

  
  //evitar que el trex caiga
  trex.collide(invisibleGround);
  
  //aparecer nubes
  
  drawSprites();
}

//función para aparecer las nubes
function spawnClouds(){
 //escribir aquí el código 
 if (frameCount %60===0){
 cloud=createSprite(600,100,40,10);
 cloud.addImage(cloudImage);
 cloud.velocityX=-5; 
 cloud.lifetime=120;
  cloud.y= Math.round(random(10,60))
  cloud.depth=trex.depth
  trex.depth=trex.depth+1
  cloudsGroup.add(cloud);
}
}
function spamobstacles (){
  if (frameCount %60===0){
    obstacles=createSprite(600,165,10,40);
    //obstacles.addImage(cloudImage);
    obstacles.velocityX=-5; 
    obstacles.scale=0.5;
    obstacles.lifetime=120;
    var rand=Math.round(random(1,6))
    switch(rand){
      case 1: obstacles.addImage(obstacle1);
              break;
      case 2: obstacles.addImage(obstacle2);
              break;
      case 3: obstacles.addImage(obstacle3);
              break;
      case 4: obstacles.addImage(obstacle4);
              break;
      case 5: obstacles.addImage(obstacle5);
              break;
      case 6: obstacles.addImage(obstacle6);
              break;
      default:break;
    }
    obstacles.depth=trex.depth;
   trex.depth=trex.depth+1;
   obstaclesGroup.add(obstacles);
   }
   
}


