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
            +'Beer Bad! Moonshine Good!'+'\n'
            +'Get Ready for Trail!'
            + '\n\nPress the UP arrow key\nto Start',
            { font: '25px Arial', fill: '#fff', align: 'center' });
        }
        else if(this.state =='level_two')
        {
            label = game.add.text(
            w/2,
            h/2, 
            "Time for Trail!"+'\n\n'
            +'Watch out for Shiggy!!'
            + '\n\nPress the UP arrow key\nto Start',
            { font: '30px Arial', fill: '#fff', align: 'center' });
        }
        else if(this.state =='level_three')
        {
            label = game.add.text(
            w/2,
            h/2, 
            "Police!"+'\n\n'
            +'Run Away!!'
            + '\n\nPress the UP arrow key\nto Start',
            { font: '25px Arial', fill: '#fff', align: 'center' });
        }
        else if(this.state =='level_bonus')
        {
            label = game.add.text(
            w/2,
            h/2, 
            "Lost Control of Circle!!"+'\n\n'
            +''
            + '\n\nPress the UP arrow key\nto Start',
            { font: '25px Arial', fill: '#fff', align: 'center' });
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