
var Player = function ()
{
  this.x = canvasElement.width / 2;
  this.y = canvasElement.height / 2;
  this.anchorX = 0.5;
  this.anchorY = 0.5;
  this.size = 200;
  this.speedMove = 5;

  this.bulletList = [];

  this.fireRateLastTime = 0;
  this.fireRateDelay = 0.01;

  this.velocity = { x: 0, y: 0 };
  this.acceleration = 1;
  this.speedMax = 20;

  this.compteur = 0;

  this.update = function ()
  {
    if (keyRight)
    {
        //this.x += this.speedMove;
        this.velocity.x = Math.min(this.speedMax, this.velocity.x + this.acceleration);
    }
    else if (keyLeft)
    {
      //this.x -= this.speedMove;
        this.velocity.x = Math.max(-this.speedMax, this.velocity.x - this.acceleration);
    }
    if (keyUp)
    {
        this.velocity.y = Math.max(-this.speedMax, this.velocity.y - this.acceleration);
        //this.y -= this.speedMove;
    }
    else if (keyDown)
    {
        this.velocity.y = Math.min(this.speedMax, this.velocity.y + this.acceleration);
      //this.y += this.speedMove;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.velocity.x *= 0.95;
    this.velocity.y *= 0.95;

    if (mouseDown)
    {
        if (this.fireRateLastTime + this.fireRateDelay < timeElapsed)
        {
            this.fireRateLastTime = timeElapsed;

            this.addBullet(this.x, this.y);
            this.compteur++;
            console.log(this.compteur);
        }
    }

    for (var i = 0; i < this.bulletList.length; i++)
    {
        var bullet = this.bulletList[i];
        bullet.update();
        bullet.draw();

        var collided = false;
        var lifeTimeExpired = false;
        
        for (var j = 0; j < obstacleList.length; j++)
        {
            var obstacle = obstacleList[j];
            if (bullet.falling == false && obstacle.circleCollision(bullet.x, bullet.y, bullet.size)) {
                collided = true;
                bullet.falling = true;
                bullet.direction.x = bullet.x - obstacle.x;
                bullet.direction.y = bullet.y - obstacle.y;

                var dist = Math.sqrt(bullet.direction.x * bullet.direction.x + bullet.direction.y * bullet.direction.y);
                bullet.direction.x /= dist;
                bullet.direction.y /= dist;

                obstacle.starAnimation();
                obstacle.life--;
            }
        }

        if(bullet.lifeTimeElapsed > bullet.lifeTimeDelay)
        {
            lifeTimeExpired = true;
        }

        if(lifeTimeExpired)
        {
            this.compteur--;
            console.log(this.compteur);
            this.bulletList.splice(i, 1);
        }
    }

    // Borders collision
    this.x = Math.min(canvasElement.width, Math.max(0, this.x));
    this.y = Math.min(canvasElement.height, Math.max(0, this.y));
  };

  this.addBullet = function(x, y)
  {
      var bullet = new Bullet();
      bullet.x = x;
      bullet.y = y;

      bullet.direction.x = mouse.x - bullet.x;
      bullet.direction.y = mouse.y - bullet.y;

      var dist = Math.sqrt(bullet.direction.x * bullet.direction.x + bullet.direction.y * bullet.direction.y);
      bullet.direction.x /= dist;
      bullet.direction.y /= dist;

      this.bulletList.push(bullet);
  }

  this.draw = function ()
  {
      draw.box(this.x - this.anchorX * this.size, this.y - this.anchorY * this.size, this.size, this.size, "#4444cd");

      draw.arrow(this.x, this.y, mouse.x, mouse.y, 4, 4);
  };
};
