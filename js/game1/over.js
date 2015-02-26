Game.Over = function (game) { };

Game.Over.prototype = {
    init: function(state,message)
    {
        this.state = state;
        this.message = message;
    },
    create: function () {     
        if(this.state == 'game_over')
        {
            label = game.add.text(
            w/2,
            h/2, 
            this.message
            +'\n\nscore: '
            + score.getValue()
            + '\n\npress the UP arrow key\nto restart',
            { font: '30px Arial', fill: '#fff', align: 'center' });

        }
        else if(this.state == 'start')
        {
            label = game.add.text(
            w/2,
            h/2, 
            "Pukin's Hash Quest"+'\n\n'
            +'Beer Bad!!'+'\n'
            +'MoonShine Good!!'
            + '\n\npress the UP arrow key\nto Start',
            { font: '30px Arial', fill: '#fff', align: 'center' });

        }


        label.anchor.setTo(0.5, 0.5);
        
        this.cursor = game.input.keyboard.createCursorKeys();
        this.time = this.game.time.now + 800;

        game.add.audio('hit').play('', 0, 0.1);
    },

    update: function() {
        if (this.game.time.now > this.time && this.cursor.up.isDown)
            game.state.start('Play');
    }
};