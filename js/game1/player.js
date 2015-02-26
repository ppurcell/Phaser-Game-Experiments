Player.baseSpeed = 150;

function Player(game)
{
	this.playerSpeed = Player.baseSpeed;
	this.sprite = game.add.sprite(game.world.width / 2, game.world.height / 2, 'hasher');
	game.physics.p2.enable(this.getSprite(), false);

	this.setupPlayer();
}

Player.prototype.setupPlayer = function()
{
	this.sprite.body.collideWorldBounds = true;

	this.sprite.animations.add('left', [2, 3], 10, true);
    this.sprite.animations.add('right', [2, 3], 10, true);
    this.sprite.animations.add('up', [6, 7], 10, true);
    this.sprite.animations.add('down', [4, 5], 10, true);

    this.sprite.body.setRectangle(this.sprite.width-10,this.sprite.height,0,0);
};

Player.prototype.getSprite = function()
{
	return this.sprite;
};


Player.prototype.getBody = function()
{
	return this.sprite.body;
};

Player.prototype.resetVelocity = function()
{
	this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
    this.sprite.body.rotation = 0;
};
Player.prototype.resetSpeed = function()
{
	this.speed = Player.baseSpeed;
};
Player.prototype.performCollision = function()
{
	this.playerSpeed -=30;
}

Player.prototype.move = function(cursors)
{
	var currentDirection = '';
	 if (cursors.left.isDown) {
            this.sprite.scale.x = 1.0;
            this.sprite.body.velocity.x = -this.playerSpeed;
            currentDirection += 'left';
        }
        if (cursors.right.isDown) {
            this.sprite.scale.x = -1.0;
            this.sprite.body.velocity.x = this.playerSpeed;
            currentDirection += 'right';
        }
        if (cursors.up.isDown) {
            this.sprite.body.velocity.y = -this.playerSpeed;
            currentDirection += 'up';
        }
        if (cursors.down.isDown) {
            this.sprite.body.velocity.y = this.playerSpeed;
            currentDirection += 'down';

        }
		if(currentDirection.indexOf('left') != -1)
		{
            this.sprite.animations.play('left');
		}
		else if(currentDirection.indexOf('right') != -1)
		{
            this.sprite.animations.play('right');
		}
		else if(currentDirection.indexOf('up') != -1)
		{
            this.sprite.animations.play('up');
		}
		else if(currentDirection.indexOf('down') != -1)
		{
            this.sprite.animations.play('down');
		}
        if (!cursors.down.isDown && !cursors.up.isDown && !cursors.left.isDown && !cursors.right.isDown) {
            //  Stand still
            this.sprite.animations.stop();
            this.sprite.frame = 0;
        }
};	


