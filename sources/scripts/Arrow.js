var Arrow = function ()
{
    this.x = 0;
    this.y = 0;

    this.scale = 5;

    this.direction = { x: 0, y: 1 };
    this.speed = 5;

    this.velocity = 1;
    this.gravity = 1;

    this.jauge = 0;

    this.isFired = false;

    this.offset = { x: 0, y: 0 };

    this.update = function()
    {
        if (this.isFired)
        {
            this.x += this.direction.x * this.speed * this.jauge * 0.05;
            this.y += this.direction.y * this.speed * this.jauge * 0.05;

            /*if (this.x < 0 || this.x > canvasElement.width) {
                this.direction.x *= -1;
            }
            if (this.y < 0 || this.y > canvasElement.height) {
                this.direction.y *= -1;
            }*/

            this.direction.x *= .99;
            this.direction.y = mix(this.direction.y, 1, .01);

            var angle = Math.atan2(this.direction.y, this.direction.x);
            this.direction.x = Math.cos(angle);
            this.direction.y = Math.sin(angle);
        }
    }

    this.draw = function()
    {
        draw.arrow2(this.x, this.y, this.direction, this.jauge, this.scale);
    }
}