var KeyboardHandler = function(keyboardObj) {
    this.controller = keyboardObj;
    this.fireLaser = function () {
        if (this.controller.isDown(Phaser.Keyboard.SPACEBAR)) {
            return true;
        }
        else {
            return false;
        }
    }
    this.moveLeft = function () {
        if (this.controller.isDown(Phaser.Keyboard.LEFT)) {
            return true;
        }
        else {
            return false;
        }
    }
    this.moveRight = function () {
        if (this.controller.isDown(Phaser.Keyboard.RIGHT)) {
            return true;
        }
        else {
            return false;
        }
    }
    this.moveUp = function () {
        if (this.controller.isDown(Phaser.Keyboard.UP)) {
            return true;
        }
        else {
            return false;
        }
    }
    this.moveDown = function () {
        if (this.controller.isDown(Phaser.Keyboard.DOWN)) {
            return true;
        }
        else {
            return false;
        }
    }
}