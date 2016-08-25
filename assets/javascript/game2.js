
$(document).ready(function() {


    // variables

    var yourCharacter = false;
    var yourEnemies = false;
    var yourDefender = false;
    var playersArray = [];
    // var audio = new Audio('https://p.scdn.co/mp3-preview/ed5a443bc86176135ebca8a114f66f4d814d4c90');

    // setTimeout(fiveSeconds, 5000);
    // function fiveSeconds(){
    //     // alert('game is about to begain')
    // }
    // audio.play();

    // creating objects and assigning them to an array 

    var firstPlayer = {
        name:['Iron Man'],
        healthPoints: 120,
        attackPower: 8,
        counterAttackPower: 10,
        numberOfAttacks: 1

    }

    var secondPlayer = {
        name: ['Captain America'],
        healthPoints: 100,
        attackPower: 5,
        counterAttackPower: 5,
        numberOfAttacks: 1
    }

    var thirdPlayer = {
        name: ['Thor'],
        healthPoints: 150,
        attackPower: 15,
        counterAttackPower: 10,
        numberOfAttacks: 1
    }

    var fourthPlayer = {
        name: ['Hulk'],
        healthPoints: 180,
        attackPower: 25,
        counterAttackPower: 25,
        numberOfAttacks: 1
    }

    playersArray.push(firstPlayer);
    playersArray.push(secondPlayer);
    playersArray.push(thirdPlayer);
    playersArray.push(fourthPlayer);
    // console.log(playersArray);


    // reset function

    function startGame() {
        var yourCharacter = false;
        var yourEnemies = false;
        var yourDefender = false;
        // firstPlayer.healthpoints=120;
        // secondPlayer.healthpoints=100;
        // thirdPlayer.healthpoints=150;
        // fourthPlayer.healthpoints=180;
    };






    // appending players as your character, enemies and defendent



    function selectOpponents() {


        if (yourCharacter === false) {
            yourCharacter = $(this);
            $('.player').after(yourCharacter);
            // console.log(yourCharacter);
            yourCharacter = playersArray[$(this).data('player') - 1];
            yourCharacter.element= $(this);
            console.log(yourCharacter);
            $(this).addClass('selectedOpponent');


            if (yourCharacter) {
                $('.enemies').after($('.inactive .character'));
                $(this).addClass('selectedEnemies')
                }
            

        } else if(yourDefender === false) {

            yourDefender = $(this);
            $('.defender').after(yourDefender);
            yourDefender = playersArray[$(this).data('player') - 1];
            yourDefender.element= $(this);

            // $(this).addClass('selectedDefender')
            // console.log(yourDefender);
        } 

    };



    // function for the fight between two players

    function fight(x, y) {

        // if enemy not selected send an alert
        if (y === false) {
            alert("Players not selected");

            return;
        }

 		
        x.healthPoints -= y.counterAttackPower; //decreasing players healthPoints with defenders counter attack
        x.element.find('.score').html(x.healthPoints); //assigned property to defender and player and class to 
        //healthpoints in html so that the class can be picked and reduced. 


        // to increment the attach of the player by its multiple.
        // assigned a property to all the players i.e numberOfAttacks and incresing it everytime
        var attacksIncrement = yourCharacter.numberOfAttacks++;
        var attackPowerIncrement = attacksIncrement*x.attackPower
        // console.log(attacksIncrement);
        y.healthPoints -= attackPowerIncrement;
        // console.log(y.healthPoints);

        y.element.find('.score').html(y.healthPoints);


        if (x.healthPoints <= 0) {
            console.log(x.healthPoints);
            // alert('you lost the game, please click on restart');
            startGame();
            return;
        } 

        else if (y.healthPoints <= 0) {
            $('.won').html('<h1 class ="winningText">' + 'you won, please select next opponent' + '</h1>')
            y.element.remove();
                // startGame();
            $('.attack').remove();
            $('.clear').remove();
              selectOpponents(this);

        }

$('.playerAttacks').html('You Attacked ' + x.name + ' for ' + attackPowerIncrement);
 $('.defenderAttacks').html(y.name + ' attacked you for ' + y.counterAttackPower);

        // console.log('player x: ' + x.healthPoints);

        //  console.log('player y: ' + y.healthPoints);      

    };




// function gameStatus{
    
//    if opponent lost then remove this opponend and select other
//     opponent won then restart this game
//     //opponent lost and player won
//     if(y.healthpoints < 0 ){
//         selectOpponents(yourDefender);

//     } 


// }






    // calling the functions 

    $('.character').on('click', selectOpponents);
    $('.attack').on('click', function() {
        fight(yourCharacter, yourDefender);
    });


});