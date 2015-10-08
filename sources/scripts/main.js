
var canvasElement = document.getElementById("container");
var timeStarted = new Date() / 1000;
var timeElapsed = 0;
var draw;
var player;
var obstacleList = [];

var letterList = [];

var timeSpawnElapsed = 0;
var timeSpawnDelay = 1;

var timeLetterElapsed = 0;
var timeLetterDelay = .05;

function init ()
{
  // Set fullscreen
  canvasElement.width = window.innerWidth;
  canvasElement.height = window.innerHeight;

  draw = new Draw();
  player = new Player();

  spawnLetter();

  // Events
  canvasElement.addEventListener('mousedown', onMouseDown);
  canvasElement.addEventListener('mouseup', onMouseUp);
  canvasElement.addEventListener('mousemove', onMouseMove);
  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);

  // Start main loop
  requestAnimationFrame(update);
}

function spawnEnemy ()
{
    var obstacle = new Obstacle();

    //horizontal
    if(Math.random() < 0.5)
    {
        //gauche
        if (Math.random() < 0.5) {
            obstacle.x = -obstacle.size;
            obstacle.y = Math.random() * canvasElement.height;
            obstacle.direction.x = 1;
            obstacle.direction.y = 0;
        }
         //droite
        else
        {
            obstacle.x = canvasElement.width + obstacle.size;
            obstacle.y = Math.random() * canvasElement.height;
            obstacle.direction.x = -1;
            obstacle.direction.y = 0;
        }
    }
     //vertical
    else
    {
        //haut
        if (Math.random() < 0.5) {
            obstacle.y = -obstacle.size;
            obstacle.x = Math.random() * canvasElement.width;
            obstacle.direction.x = 0;
            obstacle.direction.y = 1;
        }
          //bas
        else {
            obstacle.y = canvasElement.height + obstacle.size;
            obstacle.x = Math.random() * canvasElement.width;
            obstacle.direction.x = 0;
            obstacle.direction.y = -1;
        }
    }

    obstacleList.push(obstacle);
}

function mix(a, b, ratio)
{
    return a * (1 - ratio) + b * ratio;
}

function spawnLetter()
{
    var letter = new Letter();
    letter.x = 0;
    letter.y = canvasElement.height * (Math.sin(timeElapsed) * 0.5 + 0.5);
    letterList.push(letter);
}

function update ()
{
  timeElapsed = new Date() / 1000 - timeStarted;

  draw.clear();

  draw.box(0, 0, canvasElement.width, canvasElement.height, "#3f3f3c");

  // Circle mouse
  //draw.circle(mouse.x, mouse.y, 100, "#ff403c");

  player.update();
  player.draw();

  for (var j = 0; j < letterList.length; j++)
  {
      var letter = letterList[j];
      letter.update();
      letter.draw();
      if (letter.timeStart + letter.timeDelay < timeElapsed)
      {
         // letterList.splice(i, 1);
      }
  }

  for (var i = 0; i < obstacleList.length; i++)
  {
      var obstacle = obstacleList[i];
      obstacle.update();
      obstacle.draw();
      if (obstacle.isOutOfScreen() || obstacle.life <= 0)
      {
          obstacleList.splice(i, 1);
      }
  }
  
  if (timeSpawnElapsed + timeSpawnDelay < timeElapsed)
  {
      timeSpawnElapsed = timeElapsed;
      spawnEnemy();
  }

  if (timeLetterElapsed + timeLetterDelay < timeElapsed) {
      timeLetterElapsed = timeElapsed;
      spawnLetter();
  }

  // Maintain loop
  requestAnimationFrame(update);
}

document.body.onload = init
