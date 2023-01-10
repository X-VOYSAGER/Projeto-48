var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;

var score = 0;
var life = 3;
var bullets = 70;
var bullet_img;
var bullet;
var heart1, heart2, heart3

var gameState = "fight"

var lose, winning, explosionSound;


function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_1.png")
  

  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpg")
  bullet_img = loadImage("assets/bullet.png")
  lose = loadSound("assets/lose.mp3")
  winning = loadSound("assets/win.mp3")
  explosionSound = loadSound("assets/explosion.mp3")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adicionando a imagem de fundo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 3.1
  

//criando o sprite do jogador
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 2.4
   player.debug = false
   player.setCollider("rectangle",0,0,150,150)


   //criando sprites para representar vidas restantes
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

    //criando grupos de zumbis e balas
    bulletGroup = new Group()
    zombieGroup = new Group()



}

function draw() {
  background(0); 


if(gameState === "fight"){

  //exibindo a imagem apropriada de acordo com as vidas restantes
  if(life===3){
    heart3.visible = true
    heart1.visible = false
    heart2.visible = false
  }
  if(life===2){
    heart2.visible = true
    heart1.visible = false
    heart3.visible = false
  }
  if(life===1){
    heart1.visible = true
    heart3.visible = false
    heart2.visible = false
  }

  //vá para gameState "lost" quando 0 vidas estiverem restantes
  if(life===0){
    gameState = "lost"
    
  }


  //vá para gameState "won" se a pontuação for 100
  if(score==100){
    gameState = "won"
    winning.play();
  }

  //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando toques
  if(keyDown("UP_ARROW")||touches.length>0){
    bullet.y = bullet.y-30
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
   bullet.y = bullet.y+30
  }
  


//solte balas e mude a imagem do atirador para a posição de tiro quando o espaço for pressionado
if(keyWentDown("space")){
  bullet = createSprite(displayWidth-975,player.y-100,20,10)
  bullet.velocityX = 40
  bullet.scale = 0.5;
  bullet.addImage("bullet", bullet_img)
  bulletGroup.add(bullet)
  player.depth = bullet.depth
  player.depth = player.depth+2
  bullets = bullets-1
  explosionSound.play();
}



//vá para gameState "bullet" quando o jogador ficar sem balas
if(bullets==0){
  gameState = "bullet"
  lose.play();
    
}

//destrua o zumbi quando a bala o tocar e aumente a pontuação
if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){     
      
   if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy()
        bulletGroup.destroyEach()
        explosionSound.play();
 
        score = score+2
        } 
  
  }
}

//reduza a vida e destrua o zumbi quando o jogador o tocar
if(zombieGroup.isTouching(player)){
 
   lose.play();
 

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
       zombieGroup[i].destroy()
      
      life=life-1
       } 
 
 }
}

//chame a função para gerar zumbis
enemy();
}




drawSprites();

//exibindo a pontuação e as vidas e balas restantes
textSize(20)
  fill("white")
text("Balas = " + bullets,displayWidth-210,displayHeight/2-250)
text("Pontuação = " + score,displayWidth-200,displayHeight/2-220)
text("Vidas = " + life,displayWidth-200,displayHeight/2-280)

//destrua o zumbi e o jogador e exiba uma mensagem em gameState "lost"
if(gameState == "lost"){
  
  textSize(45)
  fill("red")
  text("𝖁𝖔𝖈𝖊̂ 𝖓𝖆̃𝖔 𝖈𝖔𝖓𝖘𝖊𝖌𝖚𝖎𝖚 𝖉𝖊𝖗𝖗𝖔𝖙𝖆𝖗 𝖙𝖔𝖉𝖔𝖘 𝖔𝖘 𝖗𝖔𝖇𝖔̂𝖘 :( ",70,300)
  zombieGroup.destroyEach();
  player.destroy();

}

//destrua o zumbi e o jogador e exiba uma mensagem em gameState "won"
else if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("Você Venceu",400,400)
  zombieGroup.destroyEach();
  player.destroy();

}

//destrua o zumbi, o jogador e as balas e exiba uma mensagem no gameState "bullet"
else if(gameState == "bullet"){
 
  textSize(45)
  fill("yellow")
  text("𝖁𝖔𝖈𝖊̂ 𝖋𝖎𝖈𝖔𝖚 𝖘𝖊𝖒 𝖊𝖓𝖊𝖗𝖌𝖎𝖆 𝖕𝖔𝖗𝖊́𝖒 𝖉𝖊𝖘𝖙𝖗𝖚𝖎𝖚 𝖙𝖔𝖉𝖔𝖘 𝖔𝖘 𝖗𝖔𝖇𝖔̂𝖘 𝖕𝖗𝖔́𝖝𝖎𝖒𝖔𝖘!",70,300)
  zombieGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();

}

}


//criando função para gerar zumbis
function enemy(){
  if(frameCount%50===0){

    //dando posições x e y aleatórias para o zumbi aparecer
    zombie = createSprite(random(windowWidth-10, windowWidth-150),random(windowHeight-75,windowHeight-80),140,140)


    zombie.addImage(zombieImg)
    zombie.scale = 1
    zombie.velocityX = -10
    zombie.debug= false
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }

}
