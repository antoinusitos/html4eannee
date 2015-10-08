
var canvasElement = document.getElementById("container");
var timeStarted = new Date() / 1000;
var timeElapsed = 0;
var draw;
var player;
var obstacleList = [];

var timeSpawnElapsed = 0;
var timeSpawnDelay = 1;

function init ()
{
  // Set fullscreen
  canvasElement.width = window.innerWidth;
  canvasElement.height = window.innerHeight;

  draw = new Draw();
  player = new Player();

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

function update ()
{
  timeElapsed = new Date() / 1000 - timeStarted;

  draw.clear();

  draw.box(0, 0, canvasElement.width, canvasElement.height, "#3f3f3c");

  // Circle mouse
  //draw.circle(mouse.x, mouse.y, 100, "#ff403c");

  player.update();
  player.draw();

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

  // Maintain loop
  requestAnimationFrame(update);
}

document.body.onload = init
