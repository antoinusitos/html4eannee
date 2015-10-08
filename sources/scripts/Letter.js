var Letter = function ()
{
    this.x = 0;
    this.y = 0;
    this.ratio = 0;

    this.timeStart = timeElapsed;
    this.timeDelay = 10;

    this.alphabet = ['0', '1'];

    this.getRandomLetter = function()
    {
        return this.alphabet[Math.floor(Math.random() * this.alphabet.length)];
    }

    this.character = this.getRandomLetter();

    this.draw = function()
    {
        draw.text(this.character, this.x, this.y);
    }

    this.update = function()
    {
        this.ratio = (timeElapsed - this.timeStart) / this.timeDelay;

        var xWave = this.ratio * canvasElement.width;
        var yWave = 0.5 * canvasElement.height * (Math.sin(this.ratio * 10000.0) * 0.5 + 0.5);

        var angle = this.ratio * Math.PI * 2

        var xCircle = canvasElement.width / 2 + Math.cos(angle) * 100;
        var yCircle = canvasElement.height / 2 + Math.sin(angle) * 100;

        var t = Math.sin(timeElapsed) * 0.5 + 0.5;
        t = Math.max(0, Math.min(1, t));

        this.x = mix(xWave, xCircle, t);
        this.y = mix(yWave, yCircle, t);
    }
}