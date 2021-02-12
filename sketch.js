const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var backgroundImg;
var backgroundImg2;
var player, playerImg;
var ground;
var obstacles,obstacleImg;
var position;
var ground2, ground2Img;
var play = 1;
var end = 0;
var gameState = play;
var score;
var coin1, coin2, coin3;

function preload(){
	backgroundImg = loadImage("mario2.png");
	backgroundImg2 = loadImage("background.png");
	playerImg = loadAnimation("mario3.png","mario4.png","mario5.png");
	playerImg2 = loadAnimation("mario3.png");
	obstacleImg = loadImage("ant1.png");
	obstacleImg2 = loadImage("ant2.png");
	ground2Img = loadImage("mario2.jpg");
	coinImg = loadImage("coins.png");
	coinImg2 = loadImage("coin2.png");
	coinImg3 = loadImage("coin3.png");
}

function setup() {
	createCanvas(800, 600);

	engine = Engine.create();
	world = engine.world;

	obstaclesGroup = createGroup();
	coinsGroup = createGroup();

	score = 0;

	background2 = createSprite(400,100,800,600);
	background2.addImage("back",backgroundImg2);
	background2.scale = 2.6;
	background2.velocityX = -3;

	ground = createSprite(100,550,800,20);
	ground.velocityX = -3;
	ground.scale = 3;
	ground.x = ground.width/2;
	ground.visible = false;
	console.log(ground.x);

	player = createSprite(60,510,0,0);
	player.addAnimation("run",playerImg);
	player.addAnimation("stop",playerImg2);
	//player.velocityX = 1;
	player.debug = true;

	// coin3 = createSprite(600,Math.round(random(100,200)),20,20);
	// coin3.velocityX = -3;
	// coin3.addImage(coinImg);
	// coin3.scale = 0.8;
	// console.log(coin3.x,coin3.y);

	Engine.run(engine);
}

function draw() {
	Engine.update(engine);
	rectMode(CENTER);


	if (background2.x < 280){
		background2.x = displayWidth/4;
	}

	player.collide(ground);

	if(gameState === play){
		spawnObstacles();
		spawnCoins();

		if (ground.x < 0){
			ground.x = ground.width/2;
		}

		if(keyDown("space")&& player.y>=200 ) {
			player.velocityY = -12;
		}  
		player.velocityY = player.velocityY+0.8;

		if(obstaclesGroup.isTouching(player)){
			gameState = end;
		}

		// if(frameCount%60===0){
		// 	coin3.y = Math.round(random(100,450));
		// }
		
		if(coinsGroup.isTouching(player)){
			coin1.destroy();
			score = score + 2;
		}

		// if(frameCount % 80===0){
		// 	coin1 = createSprite(800,Math.round(random(100,200)),20,20);
		// 	coin1.velocityX = -3;
		// 	coin1.scale = 0.8;
		// 	rand = Math.round(random(1,3));
		// 	switch(rand){
		// 		case 1: coin1.addImage(coinImg);
		// 				break;
		// 		case 2: coin1.addImage(coinImg2);
		// 				break;
		// 		case 3: coin1.addImage(coinImg3);
		// 				break;
		// 				default: break;
		// 	}
		// }
	}
		else if(gameState === end){
			background2.velocityX = 0;
			ground.velocityX = 0;
			player.velocityY = 0;
			obstaclesGroup.setVelocityXEach(0);
			player.changeAnimation("stop",playerImg2);
			text("GAME OVER", 400,300);
			fill("white");
			stroke("white");
			textSize(15);
		}
		console.log(gameState);
	
	drawSprites();
		
	fill("black");
	stroke("black");
	textSize(15);
	text("Score:"+ score,700,50);
}

function spawnObstacles(){
	if(frameCount % 120===0){
		obstacles = createSprite(200,500,30,30);
	
		var position = Math.round(random(1,2));
		obstacles.shapeColor = "black";
		obstacles.scale = 0.2;
		player.depth = player.depth+1;
		
		if(position===1){
			obstacles.x = 200;
			obstacles.addImage(obstacleImg);
			obstacles.velocityX = 3;
		}
		else{
			if(position===2){
				obstacles.x = 600;
				obstacles.addImage(obstacleImg2);
				obstacles.velocityX = -6;
			
			}
			obstacles.debug = true;
			console.log(obstacles.x,obstacles.y);
	}
	obstaclesGroup.add(obstacles);
	}
}

/*function spawnCoins(){
	if(frameCount % 80===0){
		coin1 = createSprite(800,Math.round(random(100,200)),20,20);
		coin1.velocityX = -3;
		coin1.addImage(coinImg);
		coin1.scale = 0.8;
	}
}

	if(frameCount % 120===0){
		coin2 = createSprite(600,Math.round(random(250,450)),20,20);
		coin2.velocityX = -3;
		coin2.addImage(coinImg);
		coin2.scale = 0.8;
	}
}*/

function spawnCoins(){
	if(frameCount % 80===0){
		coin1 = createSprite(800,Math.round(random(100,200)),20,20);
		coin1.velocityX = -3;
		rand = Math.round(random(1,3));
		switch(rand){
			case 1: coin1.addImage(coinImg);
					break;
			case 2: coin1.addImage(coinImg2);
					break;
			case 3: coin1.addImage(coinImg3);
					break;
					default: break;
		}
		coinsGroup.add(coin1);
		coin1.scale = 0.8;
	}
}