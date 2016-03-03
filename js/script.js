$( document ).ready(function() {

var position = [0,0];
var pTurn = 1;
var sameTile = 0;
var keepTurn = 0;

$( "#roll" ).click(function() {
  var result = rollDice();
  calculate(result);
  checkActivity();
  checkWinner();
  changeTurn(result);
});

$( "#arti" ).click(function() {
  artiLoc();
});

function rollDice(){
    var double = 0;
    do {
    var d1 = Math.floor(Math.random() * 7);
    var d2 = Math.floor(Math.random() * 7);
    } while (d1==0&&d2==0);
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

function calculate(result,activityType){
    var oldposition = position[(pTurn-1)];
    position[(pTurn-1)] = position[(pTurn-1)] + result[0];
    if(position[(pTurn-1)]>100) { position[(pTurn-1)] = 100; }
    move(oldposition,activityType);
}

function move(oldposition, activityType) {
    $('#p'+pTurn+'position').html('<img src="image/p'+pTurn+'.png"> player ' + pTurn + ' position: ' + position[(pTurn-1)]);
    if(oldposition==0) { soundProcess("move"); }
    if(activityType=="ladder"){
    $('#'+oldposition).delay(50).animate({'background-position-y': '-=100'}, 1000);
    }
    else if(activityType=="snake"){
    $('#'+oldposition).delay(50).animate({'background-position-y': '+=100'}, 1000);
    }
    else if(direction(oldposition)=="right"){
    $('#'+oldposition).delay(50).animate({'background-position-x': '+=550%'}, 1000);
    soundProcess("move");
    }
    else if(direction(oldposition)=="left"){
    $('#'+oldposition).delay(50).animate({'background-position-x': '-=550%'}, 1000);
    soundProcess("move");
    } 
    if(sameTile!==1){
    setTimeout( function() { $('#'+oldposition).removeClass("p1 p2 p12"); }, 3500);
    }
    $('#'+position[(pTurn-1)]).addClass("p"+pTurn); 
    var newpos = position[(pTurn-1)];
        if(activityType=="ladder"){
            $('#'+position[(pTurn-1)]).css('background-position', '10px 300px');
            $('#'+position[(pTurn-1)]).delay(2050).animate({'background-position-y': '-=250%'}, 1000);
            setTimeout( function() { soundProcess("ladder"); }, 2000);
        }
        else if(activityType=="snake"){
            $('#'+position[(pTurn-1)]).css('background-position', '10px -200px');
            $('#'+position[(pTurn-1)]).delay(2050).animate({'background-position-y': '+=250%'}, 1000);
            setTimeout( function() { soundProcess("snake"); }, 2000);
        }
        else if(direction(newpos)=="right"){
            $('#'+position[(pTurn-1)]).css('background-position', '-200px 10px');
            $('#'+position[(pTurn-1)]).delay(350).animate({'background-position-x': '+=250%'}, 1000);
        }
        else if(direction(newpos)=="left"){
            $('#'+position[(pTurn-1)]).css('background-position', '300px 10px');
            $('#'+position[(pTurn-1)]).delay(350).animate({'background-position-x': '-=250%'}, 1000);
        }

        if(sameTile==1) {
            if(pTurn==1){ 
                setTimeout( function() { $('#'+position[1]).removeClass("p1 p12"); }, 3000);
                setTimeout( function() { $('#'+position[1]).addClass("p2"); }, 3000);              
                sameTile = 0;
            }
            else if(pTurn==2){ 
                setTimeout( function() { $('#'+position[0]).removeClass("p2 p12"); }, 3000);
                setTimeout( function() { $('#'+position[0]).addClass("p1"); }, 3000);
                sameTile = 0;
            }
        }

        if(position[0]==position[1]) { 
            $('#'+position[(pTurn-1)]).addClass("p12");
            sameTile = 1; 
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
    $('#activity').html('Short Cut!');
    }
    else if(position[(pTurn-1)]<oldposition) {
    move(oldposition,"snake");
    $('#activity').html('You reach an obstacle! Head back!');
    }
    }
}

function checkWinner(){
if(position[0]>=100||position[1]>=100){
    delayedAlert();
    function delayedAlert() {
    timeoutID = window.setTimeout(slowAlert, 4000);
    }
    function slowAlert() {
    if(position[0]>=100){
    soundProcess("p1win");
    alert('Player 1 is the winner!');
    return;
    } else { 
    soundProcess("p2win");
    alert('Player 2 is the winner!'); 

    }
    }
    }
}

function soundProcess(type){
    if(type=="move") {
        var random = Math.floor(Math.random() * 6) + 1;
        var audio = new Audio("media/dice"+random+".mp3");
       audio.play();
    }
    else if(type=="ladder") {
        var random = Math.floor(Math.random() * 2) + 1;
        var audio = new Audio("media/ladder"+random+".mp3");
       audio.play();
    }
    else if(type=="snake") {
        var random = Math.floor(Math.random() * 2) + 1;
        var audio = new Audio("media/snake"+random+".mp3");
       audio.play();
    }
    else if(type=="explosion") {
        var audio = new Audio("media/explosion.mp3");
       audio.play();
    }

}

function changeTurn(result){
    if(result[1]===0||keepTurn!==0) {
        if(pTurn===1) {
            pTurn = 2;
            $('#turn').html('<img src="image/p2.png">Player 2 turn!');
        }
        else if (pTurn===2) {
            pTurn = 1;
            $('#turn').html('<img src="image/p1.png">Player 1 turn!');
        }
    }
    keepTurn = 0;
}

function artiLoc() {
    var tilesAhead = 100 - position[(pTurn-1)];
    var count = Math.ceil(tilesAhead/3);
    var loc;
    var hits = [];
    var num = 0
    $('#status').html(' Artillery Barrage commencing: ');

    for(i=0; i<count; i++) {

    do {
    loc = Math.floor(Math.random() * tilesAhead) + 1 + position[(pTurn-1)];
    } while (hits.indexOf(loc)!=-1||loc==100);
    hits.push(loc);
    }

    var attack = setInterval( function() { targets(); }, 2000);
    var ran = (Math.floor(Math.random() * 4)+1);
    $('#meme').html('<img src="image/arti'+ran+'.gif">');

    function targets() {
        soundProcess("explosion");
        $('#status').append(' '+hits[num]);
        var ran = (Math.floor(Math.random() * 10)+1);
        $('#'+hits[num]).css({
          "background-image": "url(image/explosion"+(num+1)+".gif)",
          "background-size": "60px 60px",
          "background-repeat": "no-repeat",
          "background-position": "center"
      });
        num++;
        if(num>=count) { 
            clearInterval(attack);
            checkHit();
            clearBoard();
            checkActivity();
            changeTurn([0,0]);
        }
    }

    function checkHit() {
        var enemy = otherP();
        if(hits.indexOf(position[(enemy-1)])!=-1){
            $('#status').html('Player '+enemy+' is hit!');
            var dmg = Math.floor(Math.random() * 20)+5;
            $('#status').append(' Player '+enemy+' drops '+dmg+' positions!');
            var oldposition = position[(enemy-1)];
            pTurn = enemy;
            calculate([(-dmg),0],"snake");
        }
    }

    function clearBoard() {
        for(i=0; i<count; i++) {
            $('#'+hits[i]).css({ "background-image": "",
            "background-size": "40px 40px"
        });
        }
        $('#'+position[0]).addClass("p1");
        $('#'+position[1]).addClass("p2");
        $('#meme').html('');
    }
}

function otherP(){
    if(pTurn==1){ return 2; }
    else if(pTurn==2){ return 1; }
}

});