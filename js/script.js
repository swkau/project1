$( document ).ready(function() {

var position = [0,0];
var pTurn = 1;

$( "#roll" ).click(function() {
  var result = rollDice();
  calculate(result);
  checkActivity();
  if(position[0]>=100||position[1]>=100){
    alert('Player ' + pTurn + ' is the winner!');
    return;
    }
  changeTurn(result);
});

function rollDice(){
    var double = 0;
    var d1 = Math.floor(Math.random() * 7);
    var d2 = Math.floor(Math.random() * 7);
    var diceTotal = d1 + d2;
    $('#activity').html('');
    $('#die1').text(d1);
    $('#die2').text(d2);
    $('#status').html("You rolled " + diceTotal + ".");
    if(d1 == d2){
        $('#status').html("2 x " + d1 + "!! Rolled doubles! Free turn!!");
        double = 1;
    }
    return [diceTotal, double];
}

function calculate(result){
    var oldposition = position[(pTurn-1)];
    position[(pTurn-1)] = position[(pTurn-1)] + result[0];
    if(position[(pTurn-1)]>100) { position[(pTurn-1)] = 100; }
    move(oldposition);
}

function move(oldposition, activityType) {
    $('#p'+pTurn+'position').text("player " + pTurn + " position: " + position[(pTurn-1)]);
    if(direction(oldposition)=="right"){
    $('#'+oldposition).delay(1000).animate({'background-position-x': '+=550%'}, 2000);
    }
    else if(direction(oldposition)=="left"){
    $('#'+oldposition).delay(1000).animate({'background-position-x': '-=550%'}, 2000);
    }
    //$('#'+oldposition).delay(7000).removeClass("p"+pTurn+" p12");
    if(position[0]===position[1]) { $('#'+position[(pTurn-1)]).addClass("p"+pTurn+" p12"); }
    else { 
        $('#'+position[(pTurn-1)]).addClass("p"+pTurn); 
        $('#'+position[(pTurn-1)]).css('background-position', '-200px 10px');
        if(activityType=="ladder"||activityType=="snake"){
            $('#'+position[(pTurn-1)]).delay(4000).animate({'background-position-x': '+=240%'}, 2000);
            }
        else { $('#'+position[(pTurn-1)]).delay(1200).animate({'background-position-x': '+=240%'}, 2000);
            }
        }

    function direction(position, activityType){
        if((position>=11&&position<=20)||(position>=31&&position<=40)||(position>=51&&position<=60)||(position>=71&&position<=80)||(position>=91&&position<=100)) {
            return "left";
        }
        if((position>=1&&position<=10)||(position>=21&&position<=30)||(position>=41&&position<=50)||(position>=61&&position<=70)||(position>=81&&position<=90)) {
            return "right";
        }
    }

    }

function checkActivity(result){
    var oldposition = position[(pTurn-1)];
    var mapping = {
    1:38, 4:14, 9:31, 17:7, 21:42, 28:84, 51:67, 54:34, 62:19, 64:60, 71:91, 80:100, 87:24, 93:73, 95:75, 98:79 
    };
    if(mapping[oldposition]) {
    position[(pTurn-1)] = mapping[oldposition];
    if(position[(pTurn-1)]>oldposition) {
    move(oldposition,"ladder");  
    $('#activity').html('You climb up a ladder!');
    }
    else if(position[(pTurn-1)]<oldposition) {
    move(oldposition,"snake");
    $('#activity').html('You get eaten by a snake!');
    }
    }

 /*   switch(position[(pTurn-1)]) {
        case 1:
        position[(pTurn-1)] = 38;
        move(oldposition,"ladder");
        $('#activity').html('You climb up a ladder!');
        break;
        case 4:
        position[(pTurn-1)] = 14;
        move(oldposition,"ladder");
        $('#activity').html('You climb up a ladder!');
        break;
        case 9:
        position[(pTurn-1)] = 31;
        move(oldposition,"ladder");
        $('#activity').html('You climb up a ladder!');
        break;
        case 17:
        position[(pTurn-1)] = 7;
        move(oldposition,"snake");
        $('#activity').html('You get eaten by a snake!');
        break;
        case 21:
        position[(pTurn-1)] = 42;
        move(oldposition,"ladder");
        $('#activity').html('You climb up a ladder!');
        break;
        case 28:
        position[(pTurn-1)] = 38;
        move(oldposition,"ladder");
        $('#activity').html('You climb up a ladder!');
        break;
        case 51:
        position[(pTurn-1)] = 67;
        move(oldposition,"ladder");
        $('#activity').html('You climb up a ladder!');
        break;
        case 54:
        position[(pTurn-1)] = 34;
        move(oldposition,"snake");
        $('#activity').html('You get eaten by a snake!');
        break;
        case 62:
        position[(pTurn-1)] = 19;
        move(oldposition,"snake");
        $('#activity').html('You get eaten by a snake!');
        break;
        case 64:
        position[(pTurn-1)] = 60;
        move(oldposition,"snake");
        $('#activity').html('You get eaten by a snake!');
        break;
        case 71:
        position[(pTurn-1)] = 91;
        move(oldposition,"ladder");
        $('#activity').html('You climb up a ladder!');
        break;
        case 80:
        position[(pTurn-1)] = 100;
        move(oldposition,"ladder");
        $('#activity').html('You climb up a ladder!');
        break;
        case 87:
        position[(pTurn-1)] = 24;
        move(oldposition,"snake");
        $('#activity').html('You get eaten by a snake!');
        break;
        case 93:
        position[(pTurn-1)] = 73;
        move(oldposition,"snake");
        $('#activity').html('You get eaten by a snake!');
        break;
        case 95:
        position[(pTurn-1)] = 75;
        move(oldposition,"snake");
        $('#activity').html('You get eaten by a snake!');
        break;
        case 98:
        position[(pTurn-1)] = 79;
        move(oldposition,"snake");
        $('#activity').html('You get eaten by a snake!');
        break;
        default:        
    } */
}

function changeTurn(result){
    if(result[1]===0) {
        if(pTurn===1) {
            pTurn = 2;
            $('#turn').text("Player 2's turn!");
        }
        else if (pTurn===2) {
            pTurn = 1;
            $('#turn').text("Player 1's turn!");
        }
    }
}

});