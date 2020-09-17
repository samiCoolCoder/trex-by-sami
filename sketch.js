var trex;
var trex_anim;
var edges;
var ground;
var ground_anim;
var inground;
var scloud;
var anim_scloud;
var ob;
var o1,o2,o3,o4,o5,o6;
var choose;
var score=0;
var cloudGroup,obGroup;
var PLY=1;
var END=0;
var GameState=PLY;
var trexc;
var over;
var over_anim;
var restart_anim;
var jump;
var die;
var spoint;





function preload()
{
  trex_anim=loadAnimation("trex1.png","trex3.png","trex4.png");
  ground_anim=loadImage("ground2.png");
  anim_scloud=loadImage("cloud.png");
  o1=loadImage("obstacle1.png");
  o2=loadImage("obstacle2.png");
  o3=loadImage("obstacle3.png");
  o4=loadImage("obstacle4.png");
  o5=loadImage("obstacle5.png");
  o6=loadImage("obstacle6.png");
  trexc=loadAnimation("trex_collided.png")
  over=loadImage("gameOver.png");
  restart=loadImage("restart.png")
  jump=loadSound("jump.mp3");
  die=loadSound("die.mp3");
  spoint=loadSound("checkPoint.mp3")
} 


function setup ()
{
  createCanvas (400,400);
  over_anim=createSprite(200,200,10,10);
   restart_anim=createSprite(200,300,10,10)
  trex=createSprite(77,337, 20,20);
  ground=createSprite(200,370,400,5)
  ground.addImage(ground_anim)
  inground=createSprite(200,380,400,5);
  inground.visible=false
  trex.addAnimation("running",trex_anim);
  trex.addAnimation("collide",trexc);
  over_anim.addImage(over);
  restart_anim.addImage(restart);
  trex.scale=0.5;
  edges=createEdgeSprites();
  cloudGroup=new Group()
  obGroup=new Group()
 // trex.debug=true
  trex.setCollider("circle",0,0,40)
  over_anim.scale=0.5
 restart_anim.scale=0.5
  
}


function draw () 
{
  background ("white");
  if(GameState===PLY)
  {
    if (keyDown("space")&&(trex.y>320))
  {
    trex.velocityY=-10; 
    jump.play();
  }  
    if (frameCount%100===0) 
  {
     cloud();
      obstacle();
  }
    if (frameCount%10===0)
  {
    score=score+1
  }
   ground.velocityX=-(3+score/100);
    if(trex.isTouching(obGroup))
    {
      GameState=END;
     die.play();
      //trex.velocityY=-5
     // jump.play()
    }
    if (score%100===0 && score>0)
    {
      spoint.play();
    }  
 over_anim.visible=false
    restart_anim.visible=false
      trex.velocityY=trex.velocityY+0.5
  } 
  
  else if(GameState===END)
  {
     ground.velocityX=0 ;
    cloudGroup.setVelocityXEach(0);
    obGroup.setVelocityXEach(0);
    cloudGroup.setLifetimeEach(-1);
    obGroup.setLifetimeEach(-1);
  trex.changeAnimation("collide")
    over_anim.visible=true
    restart_anim.visible=true
    trex.velocityY=0
  } 
  
    
  if(ground.x<0) 
  {
    ground.x=200
  }     
  
 
 

 // trex.collide(edges[3])
  trex.collide(inground);
  if(mousePressedOver(restart_anim))
  {
    reset();
  }
  drawSprites();
 // console.log(scloud)
  text ("score "+score,300,200)
  
}
function cloud(){
 scloud=createSprite(350,Math.round(random(50,150)),5,5)
  scloud.addImage(anim_scloud)
  scloud.velocityX=-3
  scloud.lifetime=133
  trex.depth=scloud.depth
  trex.depth=trex.depth+1
  cloudGroup.add(scloud);
  
  
    
  
}
function obstacle(){
  ob=createSprite (350,355,3,3)
  ob.scale=0.5
 ob.velocityX=-(3+score/100)
  
  choose=Math.round(random(1,6))
  switch(choose)
 {
   case 1: 
     ob.addImage(o1) ;
     break;
     
     case 2:
     ob.addImage(o2);
     break;
     
     case 3:
     ob.addImage(o3);
     break;
     
       case 4:
     ob.addImage(o4);
     break;
     
       case 5:
     ob.addImage(o5);
     break;
     
       case 6:
     ob.addImage(o6);
     break;
 }   
  ob.lifetime=133
  obGroup.add(ob)
         
}
function reset()
{
  GameState=PLY
  cloudGroup.destroyEach()
    obGroup.destroyEach()
  score=0;
  trex.changeAnimation("running");
}