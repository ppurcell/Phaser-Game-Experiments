function Powerups(game, spriteName, size)
{
	this.spriteName = spriteName;
	this.size = size;
	this.group = game.add.group();

	var i;
	for(i = 0; i < size; i++)
	{
		this.addPowerup();
	}

	this.group.setAll('body.kinematic', true);

}

Powerups.prototype.getGroup = function()
{
	return this.group;
};

Powerups.prototype.addPowerup = function()
{
	var powerup = game.add.sprite(-40, -40, this.spriteName);
	powerup.exists = false;
    powerup.alive = false;
    powerup.scale.x = .5;
	powerup.scale.y = .5;
    game.physics.p2.enable(powerup, false);
    this.group.add(powerup)
}