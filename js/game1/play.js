Game.Play = function(game) {};

//group collections
var player;
var enemies;
var ciders;

var scoreTime;
var scoreInterval = 2000;
var enemyTime;
var enemyInterval = 1500;
var powerupsTime;
var powerupInterval = 4000;

var basePlayerSpeed = 150;
var playerSpeed = 0;

var hits = 0;
var checksCollected =0;
var cidersCollected = 0;

var score;
var multiplier;
var strikes;

var restart = false;

var hitTimer;

Game.Play.prototype =  
{
    init: function()
    {
        playerSpeed = basePlayerSpeed;
        if(restart){
           hits = 0;
           multiplier.setValue(1);
           score.setValue(0);
           strikes.setValue('');
        }
        restart = true;
    },
    create: function() {
        //Physics System
        game.physics.startSystem(Phaser.Physics.P2JS);

        // The player and its settings
        player = game.add.sprite(game.world.width / 2, game.world.height / 2, 'hasher');

        //  We need to enable physics on the player
        game.physics.p2.enable(player, false);
        
        player.body.collideWorldBounds = true;
        player.animations.add('left', [2, 3], 10, true);
        player.animations.add('right', [2, 3], 10, true);
        player.animations.add('up', [6, 7], 10, true);
        player.animations.add('down', [4, 5], 10, true);
        //player.anchor.setTo(.5, 1);
        player.body.setRectangle(player.width-10,player.height,0,0);
        

        //Define our Sprite groups
        enemies = new Enemies(game, 'tree', 10);
        enemies.forEach(function(sprite){sprite.body.setRectangle(40,50,0,0)});

        ciders = new Ciders(game, 1);

        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();

        score = new TextIndicator(game, 'Score: %s',0, 15, 15);
        multiplier = new TextIndicator(game, 'Multiplier: %sX',1, 15, 30);
        strikes = new TextIndicator(game, 'Strikes: %s', '', 15, 45)

        scoreTime = 0;
        enemyTime = 0;
        hitTimer = 0;
        powerupsTime = 0 + powerupInterval;
    },

    update: function() {

        //Collide the player and the stars with the platforms
        //game.physics.arcade.collide(stars, platforms);
       // game.physics.arcade.overlap(player, stars, collectStar, null, this);

        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        player.body.rotation = 0;

        if (cursors.left.isDown) {
            //  Move to the left
            player.scale.x = 1.0;
            player.body.velocity.x = -playerSpeed;
            player.animations.play('left');
        }
        if (cursors.right.isDown) {
            //  Move to the right
            player.scale.x = -1.0;
            player.body.velocity.x = playerSpeed;
            player.animations.play('right');
        }
        if (cursors.up.isDown) {
            player.body.velocity.y = -playerSpeed;
            player.animations.play('up');
        }
        //  Allow the player to jump if they are touching the ground.
        if (cursors.down.isDown) {
            player.body.velocity.y = playerSpeed;
            player.animations.play('down');
        }
        if (!cursors.down.isDown && !cursors.up.isDown && !cursors.left.isDown && !cursors.right.isDown) {
            //  Stand still
            player.animations.stop();
            player.body.velocity.y = 0;
            player.body.velocity.x = 0;
            player.frame = 0;
        }

        if(game.time.now > scoreTime )
        {
            scoreTime = game.time.now + scoreInterval
            score.setValue(score.getValue() + (1*multiplier.getValue()));
        }
        if(game.time.now > enemyTime)
        {
            this.spawnEnemy();
        }
        if(game.time.now > powerupsTime)
        {
            this.spawnPowerUp();
        }

        //game.physics.p2.overlap(player, enemies, this.playerHit, null, this);
        player.body.onBeginContact.add(this.playerHit, this);


    },
    spawnEnemy: function()
    {
        enemyTime = game.time.now + enemyInterval;

        var pattern = rand(4);
        var x = 0;
        var y = 0;
        var tox = 0;
        var toy= 0;
        var enemy = enemies.getGroup().getFirstDead();
        if(enemy!= null)
        {

        if(pattern == 0)//Top to Bottom
        {
            x = rand(w);
            y = (-enemy.height/2);
            tox = rand(w); 
            toy = h + enemy.height;
        }
        else if(pattern == 1)//Bottom to Top
        {
            x = rand(w);
            y = h+(enemy.height/2);
            tox = rand(w); 
            toy = -enemy.height;
        }
        else if(pattern == 2)//Left to Right
        {
            x = -enemy.height/2;
            y = rand(h);
            tox = w + enemy.height; 
            toy = rand(h);
        }
        else if(pattern == 3)
        {
            x = w + (enemy.height/2);
            y = rand(h);
            tox = -enemy.height; 
            toy = rand(h);
        }

        enemy.reset(x, y);
        game.add.tween(enemy.body).to( { x: tox, y: toy }, 5000, Phaser.Easing.Linear.None).start();
        enemy.animations.add('move');
        enemy.animations.play('move', 5, true);
        }

    },
    playerHit: function(contact, enemy)
    {
        if(contact !=null && contact.sprite.key=='tree' && hitTimer < this.game.time.now)
        {
            playerSpeed -= 25;
            this.game.tweens.removeFrom(contact);
            contact.sprite.x = -100;
            contact.sprite.y = -100;
            contact.sprite.kill();
            strikes.setValue(strikes.getValue() + "X")
            hitTimer = this.game.time.now + 300;
            if(++hits >= 3)
            {
               game.state.start('Over');
            }
        }
        if(contact !=null && contact.sprite.key=='cider')
        {
            contact.sprite.kill();
            multiplier.setValue(multiplier.getValue() + 1);
        }

    },
    spawnPowerUp: function()
    {
        var cider = ciders.getGroup().getFirstDead();
        if(cider !=null)
        {
            cider.reset(250,250);
            powerupsTime = game.time.now + powerupInterval;
        }
    }
};