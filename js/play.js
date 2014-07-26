var play_state = {

	create: function() {
		//Some variables
		var textStyle = { font: "16px Arial", fill: "#ffffff" };
		this.playerLive = 2;
		this.laserTimer = 0;
		this.enemyTimer = 0;
		this.playedTime = 0;
		this.level = 1;
		//Sound
		gameMusic = this.game.add.audio('gameMusic',1,true);
		gameMusic.play();
		this.laserFireSound = this.game.add.audio('laserFire');
		this.exploseSound = this.game.add.audio('explosion');
		
		//Background
		this.mainBackground = this.game.add.sprite(0, 0, 'mainBackground');
		this.bgLayer1 = this.game.add.tileSprite(0, 0, 800, 480, 'bgLayer1');
		this.bgLayer2 = this.game.add.tileSprite(0, 0, 800, 480, 'bgLayer2');
		this.game.add.sprite(0, 0, 'top');
		
		//Player
		player = this.game.add.sprite(100, 245, 'player');
		player.anchor.setTo(0.5, 0.5);
		player.animations.add('fly');
		player.animations.play('fly', 20, true);
		//Text
		this.scoreText = this.game.add.text(300,10, "Score: 0", textStyle);
		this.liveText = this.game.add.text(10,10, "Level: 1 - Lives: 2 - Laser CD: 200ms", textStyle);
		this.castleHPText = this.game.add.text(400,10, "Castle HP: 20/20", textStyle);
	},

	update: function() {
		this.laserTimer += this.game.time.elapsed;
		this.enemyTimer += this.game.time.elapsed;
		this.playedTime += this.game.time.elapsed;
		if (this.playedTime > this.level*15000) {
			this.level++;
			this.liveText.text =  "Level: " + this.level + " - Lives: " + this.playerLive +  " - Laser CD: " + Math.floor(laserFireCD) + "ms";
			mineSpeed *= 1.2;
			mineBaseLive++;
			mineSpawnCD /= 1.2;
		}
		if  (this.enemyTimer  > mineSpawnCD) {
			this.addEnemy();
			this.enemyTimer  = 0;
		}
		
		this.bgLayer1.tilePosition.x -= 1;
		this.bgLayer2.tilePosition.x -= 3;
	
		this.inputHandle();
		
		this.updateLasers();
		
		this.updateEnemies();
		
		this.collideHandle();
	},
	
	inputHandle: function() {
        var $this = this;
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			if (player.x >= player.width/2) player.x -= shipSpeed;
		}
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			if (player.x <= game.world.width - player.width/2) player.x += shipSpeed;
		}
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
			if (player.y >= player.height/2 + 45) player.y -= shipSpeed;
		}
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
			if (player.y <= game.world.height - player.height/2) player.y += shipSpeed;
		}
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			if  (this.laserTimer  > laserFireCD) {
				this.playerFire();
				this.laserTimer  = 0;
			}
		}
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
			//this.killAllEnemies();
		}
        // let the Leap Controller (controller) handle the input by hands
        handleInputByLeapController(this, player, controller);
	},
	
	updateLasers: function() {
		if  (lasers.length > 0 && lasers[0].obj.x  > game.world.width) {
			lasers.shift().obj.kill();
		}
		for (var i = 0; i < lasers.length ; i++) {
			lasers[i].obj.x += laserSpeed;
		}
	},
	
	updateEnemies: function() {
		if (enemies.length > 0 && enemies[0].obj.x < 0 ) {
			enemies.shift().obj.kill();
		}	
		for (var i = 0; i < enemies.length ; i++) {
			enemies[i].obj.x -= mineSpeed;
		}
	},
	
	collideHandle: function() {
		for (var i = 0; i < enemies.length ; i++) {
			if (enemies[i].live > 0) {
				if (enemies[i].obj.x < 20) {
					castleHP--;
					enemies[i].live = 0;					
					this.castleHPText.text = "Castle HP: " + castleHP + "/20";
					this.explose(enemies[i].obj.x, enemies[i].obj.y);
					if (castleHP <= 0) {
						this.endGame();
						break;
					}
				}
				if (enemies[i].obj.overlap(player)){
					this.playerLive -= 1;
					enemies[i].live = 0;
					this.liveText.text =  "Level: " + this.level + " - Lives: " + this.playerLive +  " - Laser CD: " + Math.floor(laserFireCD) + "ms";
					this.explose(enemies[i].obj.x, enemies[i].obj.y);
					if (this.playerLive <= 0) {
						this.endGame();
						break;
					}
				}
				for (var j=0; j < lasers.length; j++) {
					if (lasers[j].live > 0 && enemies[i].obj.overlap(lasers[j].obj)) {
						this.explose(enemies[i].obj.x, enemies[i].obj.y);
						enemies[i].live --;
						if (enemies[i].live == 0) {
							score += 10;
							this.scoreText.text = "Score: " + score;
							if (score % 100 == 0){
								laserFireCD /= 1.2;
								this.liveText.text =  "Level: " + this.level + " - Lives: " + this.playerLive +  " - Laser CD: " + Math.floor(laserFireCD) + "ms";
							}
						}
						lasers[j].live--;
						lasers[j].obj.kill();
					}
				}
			}
			else enemies[i].obj.kill();
		}
	},
	
	playerFire: function(){
		var laser = this.game.add.sprite(player.x + 40, player.y + 7, 'laser');
		laser.anchor.setTo(0.5, 0.5); 
		lasers.push({obj: laser, live: 1});
		this.laserFireSound.play();
	},
	
	addEnemy: function() {
		var enemy = this.game.add.sprite(game.world.width , Math.floor(Math.random() * (game.world.height  - 120)) + 70 , 'mine');
		enemy.anchor.setTo(0.5, 0.5); 
		enemy.animations.add('fly');
		enemy.animations.play('fly', 20, true);
		enemies.push({obj: enemy, live: mineBaseLive});
	},
	
	explose: function(x,y) {
		var explosion = this.game.add.sprite(x, y, 'explosion');
		explosion.anchor.setTo(0.5, 0.5); 
		explosion.animations.add('eplose');
		explosion.animations.play('eplose', 20, false, function() {
			explosion.kill();
		});
		this.exploseSound.play();
	},
	
	endGame: function() {
		castleHP = 20;
		laserFireCD = 200;
		mineSpeed = 5;
		mineBaseLive = 1;
		mineSpawnCD = 600;
		enemies = [];
		lasers = [];
		gameMusic.stop();
		this.game.state.start('end');
	}
};