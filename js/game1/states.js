var LevelStateManager = 
{
	state: undefined,
	enemies: undefined,
	powerups: undefined,
	states: 
	{
		level_one:
		{
			initialize: function(parent)
			{
				this.parent = parent;
				console.log('Level One Initialize');
			},
			update: function(game, levelProgress)
			{
				this.parent.enemies.rotateAll(2);
				if(levelProgress >= 3)
			    {
			    	this.parent.changeState(this.parent.states.level_two);
			        game.state.start('Over', true, false, 'level_two', 'Game Over!');
			    }
			},
			load: function(game)
			{
				this.parent.enemies = new Enemies(game, 'beer', 20);
				this.parent.powerups = new Powerups(game,'cider', 1);
			},
		},
		level_two:
		{
			initialize: function(parent)
			{
				this.parent = parent;
				console.log('Level Two Initialize');
			},
			update: function(game, levelProgress)
			{
			    if(levelProgress >= 5)
			    {
			    	this.parent.changeState(this.parent.states.level_three);
			        game.state.start('Over', true, false, 'level_three', 'Game Over!');
			    }
			},
			load: function(game)
			{
		        this.parent.enemies = new Enemies(game, 'tree', 10);
		        this.parent.enemies.forEach(function(sprite){sprite.body.setRectangle(40,50,0,0)});
		        this.parent.powerups = new Powerups(game,'check', 1);

			},
		},
		level_three:
		{
			initialize: function(parent)
			{
				this.parent = parent;
				console.log('Level Three Initialize');
			},
			update: function(game, levelProgress)
			{
				this.parent.enemies.rotateAll(2);
				if(levelProgress >= 1)
			    {
			    	this.parent.changeState(this.parent.states.level_bonus);
			        game.state.start('Over', true, false, 'level_three', 'Game Over!');
			    }
			},
			load: function(game)
			{
				this.parent.enemies = new Enemies(game, 'police', 10);
				this.parent.enemies.forEach(function(sprite){sprite.body.setRectangle(30,50,0,0)});
			},
		},
		level_bonus:
		{
			initialize: function(parent)
			{
				this.parent = parent;
				console.log('Level Bonus:Initialize');
			},
			update: function(game, levelProgress)
			{
				this.parent.enemies.rotateAll(2);
			},
			load: function(game)
			{
				console.log('Level Bonus:Load');
				this.parent.enemies = new Enemies(game, 'beer', 20);
				this.parent.powerups = new Powerups(game,'cider', 1);
			},
		},
	},

	initialize: function()
	{
		this.states.level_one.initialize(this);
		this.states.level_two.initialize(this);
		this.states.level_three.initialize(this);
		this.states.level_bonus.initialize(this);		
		this.state = this.states.level_one;
	},
	update: function(game)
	{
		this.state.update(game, levelProgress);
	},
	load: function(game)
	{
		this.state.load(game);
	},
	changeState: function(state)
	{
		this.state = state;
	}

}