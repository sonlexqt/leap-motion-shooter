// -------------------------------------------------------------------
// handleInputByLeapController ( frame ; leapPos )
// PARAMETERS:
//            @playState (object) Input playState object
//            @player (object) Input player object
//            @controller (object) Input Leap Controller object
// RETURNS:
//            nothing
// PURPOSE:
//            handle input by the Leap Controller
// REVISIONS:
//            07/26/14 - Son Le - Initial revision
// -------------------------------------------------------------------
function handleInputByLeapController(playState, player, controller){
    // input handled by the Leap Motion Controller
    controller.on('frame', function(frame){
        // loop through the hands array returned from 'frame'
        for (var i=0; i < frame.hands.length; i++){
            // for each hand:
            var hand = frame.hands[i];
            // get the hand position in canvas coordination by using leapToScene function
            var handPos = leapToScene(frame, hand.palmPosition, game.world.width, game.world.height);

            // grabStrength has value from 0 to 1
            if (hand.grabStrength == 1 ){
                // if grabStrength = 1, let the player fire a laser
                if  (playState.laserTimer  > laserFireCD) {
                    playState.playerFire();
                    playState.laserTimer  = 0;
                }
            }

            // if the x coordinate of handPos is larger than game.world's width, ...
            if (handPos[0] > game.world.width){
                player.x = game.world.width - player.width/2;
            }
            // or if the x coordinate of handPos is smaller than 0, reposition the player
            else if (handPos[0] < 0){
                player.x = player.width/2;
            }
            // else, the x coordinate of the player will according to the x coordinate of handPos
            else player.x = handPos[0];
            // similar with the y coordinate below
            if (handPos[1] > game.world.height){
                player.y = game.world.height - player.height/2;
            }
            else if (handPos[1] < player.height/2){
                player.y = player.height/2 + 45;
            }
            else player.y = handPos[1];
        }
    });
}