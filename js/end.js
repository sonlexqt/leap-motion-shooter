var end_state = {  
	create: function() {
		bg = this.game.add.sprite(0, 0, 'endMenu');
		menuMusic.stop();
		gameMusic.stop();
		// Call the 'start' function when pressing the spacebar
		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		space_key.onDown.add(this.goBack, this); 
	
		var textStyle1 = { font: "30px Arial bold", fill: "#ffffff" };
		var textStyle2 = { font: "18px Arial bold", fill: "#ffffff" };
		var x = game.world.width/2, y = game.world.height/2;
		
		this.game.add.text(x, y+50, "Your Score is " + score, textStyle1).anchor.setTo(0.5, 0.5);
		this.game.add.text(x, y+100, "Press SPACE to back to Main Menu", textStyle2).anchor.setTo(0.5, 0.5);
		score = 0;
	},

	goBack: function() {
		this.game.state.start('menu');
	}
};