Game.Play = function(game) 
{
  // var strikes;
};

//Sprites
var player;

var scoreInterval;
var enemyInterval;
var powerupInterval;
var hitInterval;

var hits = 0;
var levelProgress = 0;

//Text Indicators
var score;
var multiplier;

var levelStateManager;

var restart = false;
var GameState = 'level_one';

Game.Play.prototype =  
{
    enemies: undefined,
    powerups: undefined,
    init: function()
    {
        if(restart){
           hits = 0;
           multiplier.setValue(1);
           score.setValue(0);
           strikes.setValue('');
           player.resetSpeed();
           levelProgress = 0;
        }
        else
        {
            levelStateManager = LevelStateManager;
            levelStateManager.initialize();
            restart = true;

        }
    },
    create: function() {
        //Physics System
        game.physics.startSystem(Phaser.Physics.P2JS);

        player = new Player(game);
        player.getBody().onBeginContact.add(this.playerHit, this);

        LevelStateManager.load(game);
        this.enemies = LevelStateManager.enemies;
        this.powerups = LevelStateManager.powerups;

        //  1 controls.
        cursors = game.input.keyboard.createCursorKeys();

        //Text indicators
        score = new TextIndicator(game, 'Score: %s',0, 15, 15);
        multiplier = new TextIndicator(game, 'Multiplier: %sX',1, 15, 30);
        strikes = new TextIndicator(game, 'Strikes: %s', '', 15, 45)

        scoreInterval = new Interval('static', 500, 0);
        enemyInterval = new Interval('static', 1500, 0);
        enemyInterval.setDecrement(25);
        powerupInterval = new Interval('random', 20000, game.time.now+4000);
        hitInterval = new Interval('static', 300,0);
    },

    update: function() {

        player.resetVelocity();
        player.move(cursors);

        LevelStateManager.update(game, levelProgress);

        if(scoreInterval.checkInterval(game.time.now))
        {
            score.setValue(score.getValue() + (1*multiplier.getValue()));
        }
        if(enemyInterval.checkInterval(game.time.now))
        {
            this.spawnEnemy();
        }
        if(powerupInterval.checkInterval(game.time.now) && this.powerups != null)
        {
            this.spawnPowerUp();
        }

    },
    spawnEnemy: function()
    {
        var pattern = rand(4);
        var x = 0;
        var y = 0;
        var tox = 0;
        var toy= 0;
        var enemy = this.enemies.getGroup().getFirstDead();
        if(enemy!= null)
        {

        if(pattern == 0)//Top to Bottom
        {   
            x = rand(w);
            y = (-enemy.height/2)+5;
            tox = rand(w); 
            toy = h + enemy.height;
        }
        else if(pattern == 1)//Bottom to Top
        {
            x = rand(w);
            y = h+(enemy.height/2)-5;
            tox = rand(w); 
            toy = -enemy.height;
        }
        else if(pattern == 2)//Left to Right
        {
            x = (-enemy.height/2)+5;
            y = rand(h);
            tox = w + enemy.height; 
            toy = rand(h);
        }
        else if(pattern == 3)
        {
            x = w + (enemy.height/2)-5;
            y = rand(h);
            tox = -enemy.height; 
            toy = rand(h);
        }

        enemy.reset(x, y);
        if(x < tox) {enemy.scale.x = -1.0;}
        else{enemy.scale.x = 1.0;}
        game.add.tween(enemy.body).to( { x: tox, y: toy }, 5000, Phaser.Easing.Linear.None).start();
        enemy.animations.add('move');
        enemy.animations.play('move', 5, true);
        }

    },
    playerHit: function(contact, enemy)
    {
        if(contact !=null && contact.sprite.key==this.enemies.spriteName && hitInterval.checkInterval(game.time.now))
        {
            player.performCollision();
            this.game.tweens.removeFrom(contact);
            contact.sprite.x = -100;
            contact.sprite.y = -100;
            contact.sprite.kill();
            strikes.setValue(strikes.getValue() + "X")
            multiplier.setValue(1);
            enemyInterval.reset();
            this.enemies.forEach(function(sprite){sprite.kill();});
            if(++hits >= 3)
            {
               game.state.start('Over', true, false, 'game_over', 'Game Over!');
            }
        }
        if(contact !=null && this.powerups !=null && contact.sprite.key==this.powerups.spriteName)
        {
            contact.sprite.kill();
            multiplier.setValue(multiplier.getValue() + 1);
            levelProgress += 1;
        }
    },
    spawnPowerUp: function()
    {
        var powerup = this.powerups.getGroup().getFirstDead();
        if(powerup !=null)
        {
            powerup.reset(rand(w-20),rand(h-20));
            powerupsTime = game.time.now + powerupInterval;
        }
    }
};