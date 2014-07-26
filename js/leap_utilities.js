// -------------------------------------------------------------------
// leapToScene ( frame ; leapPos )
// PARAMETERS:
//            @frame (object) Input frame information, sent from the
//                Leap Motion Controller
//            @leapPos (array) Input coordinate of the hand's palm
//                from space
// RETURNS:
//            (array) The coordinate of the hand's converted into
//                  Canvas coordination
// PURPOSE:
//            convert the coordinate of hand's palm from the Leap Motion
//              coordination to the Canvas coordination
// REVISIONS:
//            07/23/14 - Son Le - Initial revision
// -------------------------------------------------------------------
function leapToScene( frame , leapPos, gameDivWidth, gameDivHeight ){

  // Gets the interaction box of the current frame
  var iBox = frame.interactionBox;

  // Gets the left border and top border of the box
  // In order to convert the position to the proper
  // location for the canvas
  var left = iBox.center[0] - iBox.size[0]/2;
  var top = iBox.center[1] + iBox.size[1]/2;

  // Takes our leap coordinates, and changes them so
  // that the origin is in the top left corner 
  var x = leapPos[0] - left;
  var y = leapPos[1] - top;

  // Divides the position by the size of the box
  // so that x and y values will range from 0 to 1
  // as they lay within the interaction box
  x /= iBox.size[0];
  y /= iBox.size[1];

  // Uses the height and width of the canvas to scale
  // the x and y coordinates in a way that they 
  // take up the entire canvas
  x *= gameDivWidth;
  y *= gameDivHeight;
  // Returns the values, making sure to negate the sign
  // of the y coordinate, because the y basis in canvas 
  // points down instead of up
  return [ x , -y ];
}