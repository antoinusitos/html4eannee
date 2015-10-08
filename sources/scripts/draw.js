
var Draw = function ()
{
  this.canvasElement = document.getElementById("container");
  this.context2d = this.canvasElement.getContext("2d");

  this.clear = function ()
  {
    this.context2d.beginPath();
    this.context2d.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
  }

  this.box = function (x, y, width, height, color)
  {
    this.context2d.fillStyle = color;
    this.context2d.fillRect(x, y, width, height);
  };

  this.circle = function (x, y, radius, color)
  {
    this.context2d.beginPath();
    this.context2d.fillStyle = color;
    this.context2d.arc(x, y, radius, 0, 2*Math.PI);
    this.context2d.fill();
  };

  this.line = function (x1, y1, x2, y2, color, lineWidth)
  {
    this.context2d.strokeStyle = color;
    this.context2d.beginPath();
    this.context2d.moveTo(x1, y1);
    this.context2d.lineTo(x2, y2);
    this.context2d.stroke();
  };

  this.arrow = function (x, y, x2, y2, length, thickness)
  {
      this.context2d.fillStyle = "#ff0000";
      this.context2d.strokeStyle = "#ffffff";
      this.context2d.beginPath();

      var direction = { x: x2 - x, y: y2 - y }
      var dist = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
      direction.x /= dist;
      direction.y /= dist;
      var droite = {x:direction.y, y:-direction.x}

      this.context2d.moveTo(x + droite.x * thickness, y + droite.y * thickness);
      this.context2d.lineTo(x2 + droite.x * thickness, y2 + droite.y * thickness);

      this.context2d.lineTo(x2 + droite.x * thickness * 8, y2 + droite.y * thickness * 8);
      this.context2d.lineTo(x2 + direction.x * 30, y2 + direction.y * 30);
      this.context2d.lineTo(x2 - droite.x * thickness * 8, y2 - droite.y * thickness * 8);

      this.context2d.lineTo(x2 - droite.x * thickness, y2 - droite.y * thickness);
      this.context2d.lineTo(x - droite.x * thickness, y - droite.y * thickness);

      this.context2d.fill();
  };
};
