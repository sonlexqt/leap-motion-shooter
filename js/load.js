var init_state = {  
    preload: function() { 
		this.game.stage.backgroundColor = '#00000000';
		this.game.load.image('loaderEmpty', 'assets/loaderEmpty.png');
		this.game.load.image('loaderFull', 'assets/loaderFull.png'); 
    },

    create: function() {
        // When all assets are loaded, go to the 'menu' state
        this.game.state.start('load');
    }
};

var load_state = {  
    preload: function() { 
	//"Loading Assets" text
	var style = { font: "30px Arial", fill: "#ffffff" };
        var x = game.world.width/2, y = game.world.height/2;
        var text = this.game.add.text(x, y-50, "Loading Assets....", style);
        text.anchor.setTo(0.5, 0.5); 
	
	//Progress Bar
	this.loaderEmpty = this.game.add.sprite(this.game.world.centerX, y, 'loaderEmpty');
        this.preloadBar = this.game.add.sprite(this.loaderEmpty.x - this.loaderEmpty.width/2, y, 'loaderFull');
        this.loaderEmpty.anchor.setTo(0.5, 0);
        this.game.load.setPreloadSprite(this.preloadBar);
	
	//Load resources
	this.game.load.image('mainMenu', 'assets/mainMenu.png');  
        this.game.load.image('endMenu', 'assets/endMenu.png');
	this.game.load.image('top', 'assets/top.png');
	this.game.load.image('mainBackground', 'assets/mainBackground.png');
	this.game.load.image('bgLayer1', 'assets/bgLayer1.png'); 
	this.game.load.image('bgLayer2', 'assets/bgLayer2.png'); 
	this.game.load.spritesheet('player', 'assets/shipAnimation.png', 115, 69, 8);
	this.game.load.spritesheet('mine', 'assets/mineAnimation.png', 47, 61, 8);
	this.game.load.image('laser', 'assets/laser.png'); 
	this.game.load.spritesheet('explosion', 'assets/explosion.png', 133.5, 134, 12); 
        this.game.load.audio('menuMusic', 'assets/sound/menuMusic.mp3');
	this.game.load.audio('gameMusic', 'assets/sound/gameMusic.mp3');
	this.game.load.audio('laserFire', 'assets/sound/laserFire.wav');
	this.game.load.audio('explosion', 'assets/sound/explosion.wav');
    },

    create: function() {
        // When all assets are loaded, go to the 'menu' state
        this.game.state.start('menu');
    }
};