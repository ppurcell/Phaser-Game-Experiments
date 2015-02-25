function Enemies(game, spriteName, size)
{
	var size = size;
	var spriteName = spriteName
	var group = game.add.group();

	var i;
	for(i = 0; i < size; i++)
	{
		this.addEnemy();
	}

	group.setAll('outOfBoundsKill', true);
    group.setAll('checkWorldBounds', true);
       // enemies.setAll('body.collideWorldBounds', false);
    group.setAll('body.kinematic', true);

}

Enemies.prototype.getGroup = function()
{
	return group;
};

Enemies.prototype.addEnemy = function()
{
	var sprite = game.add.sprite(-40, -40, this.spriteName);
	sprite.exists = false;
    sprite.alive = false;
    game.physics.p2.enable(sprite, true);
    group.add(sprite)
};

Enemies.prototype.forEach = function(bodyCallBack)
{
	group.forEach(bodyCallBack, this)
};