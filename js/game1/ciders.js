function Ciders(game, size)
{
	this.size = size;
	this.group = game.add.group();

	var i;
	for(i = 0; i < size; i++)
	{
		this.addCider();
	}

	this.group.setAll('body.kinematic', true);

}

Ciders.prototype.getGroup = function()
{
	return this.group;
};

Ciders.prototype.addCider = function()
{
	var cider = game.add.sprite(-40, -40, 'cider');
	cider.exists = false;
    cider.alive = false;
    cider.scale.x = .5;
	cider.scale.y = .5;
    game.physics.p2.enable(cider, false);
    this.group.add(cider)
}