function Enemies(game,spriteName, size)
{
	this.size = size;
	this.spriteName = spriteName
	this.group = game.add.group();

	var i;
	for(i = 0; i < size; i++)
	{
		this.addEnemy();
	}

	this.group.setAll('outOfBoundsKill', true);
    this.group.setAll('checkWorldBounds', true);
    // enemies.setAll('body.collideWorldBounds', false);
    this.group.setAll('body.kinematic', true);

}

Enemies.prototype.getGroup = function()
{
	return this.group;
};

Enemies.prototype.addEnemy = function()
{
	var sprite = game.add.sprite(-40, -40, this.spriteName);
	sprite.exists = false;
    sprite.alive = false;
    game.physics.p2.enable(sprite, false);
    //sprite.body.angle = 500;
    this.group.add(sprite)
};

Enemies.prototype.rotateAll = function(value)
{
	this.group.forEachAlive(function(sprite)
	{
		sprite.body.angle = sprite.body.angle + value;
	})
};

Enemies.prototype.forEach = function(bodyCallBack)
{
	this.group.forEach(bodyCallBack, this)
};