var Arrow = function ()
{
    this.x = 0;
    this.y = 0;

    this.scale = 5;

    this.direction = { x: 0, y: 1 };
    this.speed = 5;

    this.velocity = 1;
    this.gravity = 1;

    this.offset = { x: 0, y: 0 };

    this.update = function()
    {
        this.x += this.direction.x * this.speed;
        this.y += this.direction.y * this.speed;

        if (this.x < 0 || this.x > canvasElement.width) {
            this.direction.x *= -1;
        }
        if (this.y < 0 || this.y > canvasElement.height) {
            this.direction.y *= -1;
        }

        this.direction.x *= .99;
        this.direction.y = mix(this.direction.y, 1, .01);
    }

    this.draw = function()
    {
        var x2 = this.x + this.direction.x * this.speed;
        var y2 = this.y + this.direction.y * this.speed;
        draw.arrow(this.x, this.y, x2, y2, 1, this.scale);
    }
}