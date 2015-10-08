var Button = function()
{
    this.x = 0;
    this.y = 0;
    this.width = 100;
    this.height = 50;
    this.pivot = { x: 0.5, y: 0.5 };
    this.Text = "Button";
    this.callback = function () { };

    this.getLeft = function () { return this.x - this.pivot.x * this.width };
    this.getRight = function () { return this.x + this.pivot.x * this.width };
    this.getTop = function () { return this.y - this.pivot.y * this.height };
    this.getBottom = function () { return this.y + this.pivot.y * this.height };

    this.draw = function()
    {
        var color = "#000000";
        if (this.hitTestCollision(mouse.x, mouse.y))
        {
            color = "#ff0000";
            document.body.style.cursor = "pointer";
            if(mouseDown)
            {
                this.callback();
            }
        }
        else
        {
            document.body.style.cursor = "default";
        }
        draw.text(this.Text, canvasElement.width / 2, canvasElement.height / 2, 46, color);
    }

    this.hitTestCollision = function(x, y)
    {
        return x > this.getLeft() && x < this.getRight() && y < this.getBottom() && y > this.getTop();
    }
}