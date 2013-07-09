var lake = [];
var player1 = new ComputerPlayer(lake);

var intervalId;

function start() {
    debug();
    intervalId = setInterval(takeTurn, 50);
}

function stop() {
    clearInterval(intervalId);
}

function takeTurn() {
    player1.takeTurn();
    debug();
}

function debug() {
    var lakeSize = 0;
    for (var i = 0; i < lake.length; ++i) {
        lakeSize += lake[i].length;
    }
    if (lakeSize + player1.debugNumCards() !== 1 * 56) {
        throw new Error('Invalid number of cards in play');
    }

    console.log('_____________________________');
    console.log('Lake');
    for (var i = 0; i < lake.length; ++i) {
        var pile = lake[i];
        console.log(pile[pile.length - 1]);
    }
    player1.debug();
}
