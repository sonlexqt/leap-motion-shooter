// Initialize Phaser
var game = new Phaser.Game(800, 480, Phaser.AUTO, 'game_div');

//Global variables
var player;
var lasers = [];
var enemies = [];
var menuMusic;
var gameMusic;

var score = 0;
var castleHP = 20;
var shipSpeed = 10;
var laserSpeed = 20;
var laserFireCD = 200;
var mineSpeed = 5;
var mineBaseLive = 1;
var mineSpawnCD = 600;

// Define all the states
game.state.add('init', init_state);  
game.state.add('load', load_state);  
game.state.add('menu', menu_state);  
game.state.add('play', play_state);  
game.state.add('end', end_state);

//// creates a new Leap Controller object
//var controller = new Leap.Controller();
//// connect the controller with the web socket
//controller.connect();

//var inputHandler_Leap = new LeapControllerHandler();
//inputHandler_Leap.init();

//var inputHandler = new KeyboardHandler();
//inputHandler.init();

// Start with the 'init' state
game.state.start('init');  