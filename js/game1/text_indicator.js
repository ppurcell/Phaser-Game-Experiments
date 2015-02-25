function TextIndicator (game, label,initial, x, y)
{
	this.label = label;
	this.x = x;
	this.y = y;
	this.value = initial;

	this.default_font_size = 15;

	this.textObj = game.add.text(x, y, sprintf(label, this.value), {fill: '#fff'});
    this.textObj.fontSize = this.default_font_size;
}



TextIndicator.prototype.setValue = function(value)
{
	this.value = value;
	this.textObj.text = sprintf(this.label, this.value);
};

TextIndicator.prototype.getValue = function()
{
	return this.value;
};

function sprintf(format, etc) {
    var arg = arguments;
    var i = 1;
    return format.replace(/%((%)|s)/g, function (m) { return m[2] || arg[i++] })
}