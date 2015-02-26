Game = {};

var w = 350;
var h = 350;
//var score = 0;

Game.Load = function(game) {};

function rand(num){ return Math.floor(Math.random() * num) };

Game.Load.prototype = 
{
	preload: function()
	{
		game.stage.backgroundColor = '#062F00';
		label = game.add.text(w/2, h/2, 'loading...',{font: '30px Arial', fill: '#fff'});
		label.anchor.setTo(0.5, 0.5);

		game.load.spritesheet('hasher', 'assets/hasher-sticker2.png', 50, 50);
    	game.load.spritesheet('tree', 'assets/tree-sticker.png', 70, 70);
    	game.load.image('apple', 'assets/apple.png');
    	game.load.image('cider', 'assets/moonshine.png');
    	game.load.image('beer', 'assets/beer.png');
    	game.load.image('empty-moonshine', 'assets/empty-moonshine.png');
    	game.load.image('check', 'assets/check.png');
	},
	create: function()
	{
		game.state.start('Over', true, false, 'start', '');
	}
};