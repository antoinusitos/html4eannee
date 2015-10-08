var Bullet = function()
{
    this.x = 0;
    this.y = 0;

    this.size = 20;

    this.direction = { x: 1, y: 0 };
    this.speed = 10;

    this.velocity = -10;
    this.gravity = 1;

    this.lifeTimeStarted = timeElapsed;
    this.lifeTimeElapsed = 0;
    this.lifeTimeDelay = 100;
    this.lifeTimeRatio;
    this.colortime = 5;
    this.colortimeEla = 0;

    this.letters = '0123456789ABCDEF'.split('');
    this.color = '#';
    for (var i = 0; i < 6; i++) {
        this.color += this.letters[Math.floor(Math.random() * 16)];
    }

    this.falling = false;

    this.draw = function()
    {
        draw.circle(this.x, this.y, this.size * Math.sin(this.lifeTimeRatio * Math.PI), this.color);
    }

    this.update = function()
    {
        this.lifeTimeElapsed = timeElapsed - this.lifeTimeStarted;
   
         /*if (this.colortimeEla + this.colortime < timeElapsed)
         {
             this.colortimeEla = timeElapsed;
             for (var i = 0; i < 6; i++) {
               this.color += this.letters[Math.floor(Math.random() * 16)];
             }
        }*/
        
        this.lifeTimeRatio = this.lifeTimeElapsed / this.lifeTimeDelay;
        this.lifeTimeRatio = Math.max(0, Math.min(1, this.lifeTimeRatio));

        if (!this.falling)
        {
            this.x += this.direction.x * this.speed;
            this.y += this.direction.y * this.speed;

            if (this.x < 0 || this.x > canvasElement.width) {
                this.direction.x *= -1;
            }
            if (this.y < 0 || this.y > canvasElement.height) {
                this.direction.y *= -1;
            }
        }
        else
        {
            this.x += this.direction.x * this.speed;
            this.y += this.velocity;
            this.velocity += this.gravity;
        }
    }
}