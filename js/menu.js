var menu_state = {  
	create: function() {
		this.game.add.sprite(0, 0, 'mainMenu');
		
		// Call the 'start' function when pressing the spacebar
		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		space_key.onDown.add(this.start, this); 
		
		// Defining variables
		var style = { font: "30px Arial bold", fill: "#ffffff" };
		var x = game.world.width/2, y = game.world.height/2;
		
		// Adding a text centered on the screen
		var text = this.game.add.text(x, y+50, "Press SPACE to Start", style);
		text.anchor.setTo(0.5, 0.5); 
		
		menuMusic = this.game.add.audio('menuMusic',1,true);
		menuMusic.play();
	},

	// Start the actual game
	start: function() {
		menuMusic.stop();
		this.game.state.start('play');
	}
};