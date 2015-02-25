var game = new Phaser.Game(w, h, Phaser.AUTO, 'gameContainter');

game.state.add('Load', Game.Load);
game.state.add('Play', Game.Play);
game.state.add('Over', Game.Over);

game.state.start('Load');