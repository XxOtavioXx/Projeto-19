var boy, ghost, ground, fundo;
var boyImg,ghostImg,backgroundImg,endImg;
var ghostG;

var PLAY=1;
var END=0;
var gameState=1; 
var score=0;

function preload(){
    endImg= loadAnimation("fimdeJogo.png")
    boyImg = loadAnimation("Runner-1.png","Runner-2.png");
    ghostImg = loadImage("fantasma.png");
    backgroundImg = loadImage("Road.jpg");
}

function setup() {
    createCanvas (400,600)
    ghostG= new Group();
    //movendo o fundo
    fundo=createSprite(200,300);
    fundo.addImage(backgroundImg);
    fundo.velocityY = 4;
    fundo.scale=1.5
    //criando o menino correndo.
    boy = createSprite(200,560);
    boy.addAnimation("Running",boyImg);
    boy.scale=0.07;

}

function draw() {
    if(gameState===PLAY){
          boy.x = World.mouseX;
          edges= createEdgeSprites();
          boy.collide(edges);  
          //reiniciando o fundo.
        if(fundo.y > 400 ){
            fundo.y = height/2;
        }
        createGhost();
 
//}
        if(ghostG.isTouching(boy)){
            gameState=END;
            //boy.addImage(endImg);
            boy.addAnimation("Running", endImg);
            boy.x=200;
            boy.y=300;
            boy.scale=0.6;  
            ghostG.destroyEach();
            ghostG.setVelocityYEach(0);
           
        }
    score = score + Math.round(frameRate()/60);
    drawSprites();
    textSize(20);
    //fill(255);
    text("Pontuação: " + score,10,30);
    } //adicionado
}


function createGhost(){
    if (World.frameCount % 30 == 0) {
        var ghost = createSprite(Math.round(random(50, 350),40, 10, 10));
        ghost.addImage(ghostImg);
        ghost.scale=0.08;
        ghost.velocityY = 10;
        ghost.lifetime = 230;
        ghostG.add(ghost);
        }
    }