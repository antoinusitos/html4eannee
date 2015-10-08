
var Player = function ()
{
  this.x = canvasElement.width / 2;
  this.y = canvasElement.height / 2;
  this.anchorX = 0.5;
  this.anchorY = 0.5;
  this.size = 200;
  this.speedMove = 5;

  this.bulletList = [];
  this.arrowList = [];

  this.hasClicked = false;
  this.currentArrow;
  this.fireRateLastTime = 0;
  this.fireRateDelay = 0.05;

  this.velocity = { x: 0, y: 0 };
  this.acceleration = 1;
  this.speedMax = 20;

  this.color = "#ff0000";

  this.score = 0;
  this.life = 3;
  this.invincibilityTimeStat = 0;
  this.invincibilityTimeDelay = 1;

  this.getLeft = function () { return this.x - this.anchorX * this.size };
  this.getRight = function () { return this.x + this.anchorX * this.size };
  this.getTop = function () { return this.y - this.anchorY * this.size };
  this.getBottom = function () { return this.y + this.anchorY * this.size };

  this.hitTestCollision = function(x, y)
  {
      return x > this.getLeft() && x < this.getRight() && y < this.getBottom() && y > this.getTop();
  }

  this.hurt = function()
  {
      if(this.invincibilityTimeStat + this.invincibilityTimeDelay > timeElapsed)
      {
          var ratio = (timeElapsed - this.invincibilityTimeStat) / this.invincibilityTimeDelay;
          this.color = Math.cos(ratio * Math.PI * 2 *10) < 0 ? "#ffffff" : "#ff0000";
      }
      else
      {
          this.life --;
          this.invincibilityTimeStat = timeElapsed;
      }
  }

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
       /* if (this.fireRateLastTime + this.fireRateDelay < timeElapsed)
        {
            this.fireRateLastTime = timeElapsed;

            // this.addBullet(this.x, this.y);
            this.addArrow(this.x, this.y);
        }*/
        if (this.hasClicked == false)
        {
            this.hasClicked = true;
            this.currentArrow = this.addArrow(this.x, this.y);
        }
        else
        {
            this.currentArrow.jauge += 1;

            var angleArrow = Math.atan2(mouse.y - this.y, mouse.x - this.x);
            this.currentArrow.direction.x = Math.cos(angleArrow);
            this.currentArrow.direction.y = Math.sin(angleArrow);

            this.currentArrow.x = this.x;
            this.currentArrow.y = this.y;
        }
    }
    else if (this.hasClicked)
    {
        this.hasClicked = false;
        this.currentArrow.isFired = true;
    }

    for(var j = 0; j < obstacleList.length; j++)
    {
        var obstacle = obstacleList[j];
        var direction = {x: this.x - obstacle.x, y: this.y - obstacle.y};
        var dist = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
        direction.x /= dist;
        direction.y /= dist;

        var x = obstacle.x + direction.x * obstacle.size;
        var y = obstacle.y + direction.y * obstacle.size;
        if(this.hitTestCollision(x,y))
        {
            this.hurt();
        }
    }

    for (var i = 0; i < this.arrowList.length; i++)
    {
        var arrow = this.arrowList[i];
        arrow.update();
        //arrow.draw();

        for (var j = 0; j < obstacleList.length; j++) {
            var obstacle = obstacleList[j];
            if (arrow.isFired && obstacle.circleCollision(arrow.x, arrow.y, 20))
            {
                obstacle.starAnimation();
                obstacle.addArrow(arrow);
                this.arrowList.splice(i, 1);
                spawnParticle(arrow.x, arrow.y, 3 + Math.floor(Math.random() * 3));
                this.score += 1000;
            }
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

  this.addArrow = function (x, y) {
      var arrow = new Arrow();
      arrow.x = x;
      arrow.y = y;

      arrow.direction.x = mouse.x - arrow.x;
      arrow.direction.y = mouse.y - arrow.y;

      var dist = Math.sqrt(arrow.direction.x * arrow.direction.x + arrow.direction.y * arrow.direction.y);
      arrow.direction.x /= dist;
      arrow.direction.y /= dist;

      this.arrowList.push(arrow);
      return arrow;
  }

  this.draw = function ()
  {
      draw.box(this.x - this.anchorX * this.size, this.y - this.anchorY * this.size, this.size, this.size, this.color);

      for (var i = 0; i < this.arrowList.length; i++)
      {
          var arrow = this.arrowList[i];
          arrow.draw();
      }
      //draw.arrow(this.x, this.y, mouse.x, mouse.y, 4, 4);
  };
};
