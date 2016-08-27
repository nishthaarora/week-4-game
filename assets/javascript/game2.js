$(document).ready(function() {

    // variables

    var yourCharacter = false;
    var yourEnemies = false;
    var yourDefender = false;
    var playersArray = [];
    var enemyDefeatedCount = 0;


    // creating objects and assigning them to an array 

    var firstPlayer = {
        name: 'Jon Snow',
        healthPoints: 120,
        attackPower: 8,
        counterAttackPower: 8,
        numberOfAttacks: 1

    }

    var secondPlayer = {
        name: 'Cersei Lannister',
        healthPoints: 100,
        attackPower: 5,
        counterAttackPower: 5,
        numberOfAttacks: 1
    }

    var thirdPlayer = {
        name: 'Daenerys Targaryen',
        healthPoints: 150,
        attackPower: 15,
        counterAttackPower: 20,
        numberOfAttacks: 1
    }

    var fourthPlayer = {
        name: 'Ramsay Bolton',
        healthPoints: 180,
        attackPower: 25,
        counterAttackPower: 25,
        numberOfAttacks: 1
    }

    playersArray.push(firstPlayer);
    playersArray.push(secondPlayer);
    playersArray.push(thirdPlayer);
    playersArray.push(fourthPlayer);



    // reset function

    function startGame() {
        yourCharacter = false;
        yourEnemies = false;
        yourDefender = false;


    };


    // function to play an audio

    var audio = new Audio('assets/images/themeSong.mp3');

    audio.play();

    $('body').prepend('<button class="start">START</button>');


    function clickToStart() {
        $(this).hide();  
    $('.container').removeClass('hidden');
    };


    function oneMinute() {
        audio.pause();
    };

    setTimeout(oneMinute, 60000);


    // appending players as your character, enemies and defendent

    function selectOpponents() {

        $('.notice').remove();

        if (yourCharacter === false) {
            yourCharacter = $(this);
            $('.player').after(yourCharacter);
            yourCharacter = playersArray[$(this).data('player') - 1];
            yourCharacter.element = $(this);
            $(this).addClass('selectedOpponent');
            console.log('x: ' + yourCharacter);

            if (yourCharacter) {
                $('.enemies').after($('.inactive .character'));
                $(this).addClass('selectedEnemies')
            }

        } else if (yourDefender === false) {

            yourDefender = $(this);
            $('.defender').after(yourDefender);
            yourDefender = playersArray[$(this).data('player') - 1];
            yourDefender.element = $(this);
            $(this).addClass('selectedDefender')
            $('.lost').html('');

        }
    };


    // function for the fight between two players

    function fight(x, y) {

        // if enemy not selected send an alert

        if (yourDefender === false) {
            alert("Players not selected");

            return;
        }

        // logic for healthpoint deduction

        var attacksIncrement = yourCharacter.numberOfAttacks++;
        console.log(attacksIncrement);
        var attackPowerIncrement = attacksIncrement * x.attackPower
        console.log(attackPowerIncrement);
        y.healthPoints -= attackPowerIncrement;
        console.log(y.healthPoints);
        y.element.find('.score').html(y.healthPoints);


        if (y.healthPoints <= 0) {
            y.element.hide();
            yourDefender = false;
            $('.lost').html(y.name + ' is defeated');
            enemyDefeatedCount++;


            if (enemyDefeatedCount === 3) {
                $('.won').html('<h1 class ="winningText">' + 'You Won' + '</h1>')
            }



        } else {
            x.healthPoints -= y.counterAttackPower;
            x.element.find('.score').html(x.healthPoints);
        }

        if (x.healthPoints <= 0) {
            x.element.hide();
            $('.attack').hide();

            startGame();
            return;

        }

        $('.playerAttacks').html('You Attacked ' + y.name + ' for ' + attackPowerIncrement);
        $('.defenderAttacks').html(y.name + ' attacked you for ' + y.counterAttackPower);

    };

    // changing function names

    $('.character').on('click', selectOpponents);
    $('.attack').on('click', function() {
        fight(yourCharacter, yourDefender);
    });
    $('.start').on('click', clickToStart);

});