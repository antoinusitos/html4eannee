var Obstacle = function ()
{
    this.x = canvasElement.width / 4;
    this.y = canvasElement.height / 2;

    this.size = 60;

    this.timeCollisionStart = 0;
    this.timeCollisionEnd = 1;

    this.direction = { x: 1, y: 0 };
    this.speed = 2;

    this.arrowList = [];

    this.life = 10;

    this.getSize = function()
    {
        return this.size * (this.life / 10);
    }

    this.draw = function () {
        draw.circle(this.x, this.y, this.getSize(), "#000000");
    }

    this.addArrow = function(arrow)
    {
        this.arrowList.push(arrow);
        arrow.offset.x = arrow.x - this.x;
        arrow.offset.y = arrow.y - this.y;
    }

    this.starAnimation = function()
    {
        this.timeCollisionStart = timeElapsed;
    }

    this.update = function ()
    {
        this.x += this.direction.x * this.speed;
        this.y += this.direction.y * this.speed;

        if(this.timeCollisionStart + this.timeCollisionEnd > timeElapsed)
        {
            var ratio = (timeElapsed - this.timeCollisionStart) / this.timeCollisionEnd;
            this.size = 60 + Math.sin(ratio * 10) * 20 * (1 - ratio);
        }

        for(var i= 0; i < this.arrowList.length; i++)
        {
            var arrow = this.arrowList[i];
            arrow.x = arrow.offset.x + this.x;
            arrow.y = arrow.offset.y + this.y;
            arrow.draw();
        }
    }
    
    this.isOutOfScreen = function()
    {
        return this.x < -this.size || this.x > canvasElement.width + this.size || this.y < -this.size || this.y > canvasElement.height;
    }

    this.circleCollision = function (x, y, radius) {
        var vX = (x - this.x);
        var vY = (y - this.y);
        var dist = Math.sqrt(vX * vX + vY * vY);
        return dist - radius - this.getSize() < 0;
    }
}