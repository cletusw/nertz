var lake = [];
var players = [
    new ComputerPlayer(lake),
    new ComputerPlayer(lake)
];

var intervalId;

function start() {
    debug();
    intervalId = setInterval(takeTurn, 50);
}

function stop() {
    clearInterval(intervalId);
}

function takeTurn() {
    try {
        players[0].takeTurn();
    } catch (e) {
        stop();
        console.log('Player 1 Wins!');
        debug();
        return;
    }
    try {
        players[1].takeTurn();
    } catch (e) {
        stop();
        console.log('Player 2 Wins!');
        debug();
        return;
    }
    debug();
}

function debug() {
    var lakeSize = 0;
    for (var i = 0; i < lake.length; ++i) {
        lakeSize += lake[i].length;
    }
    if (lakeSize + players[0].debugNumCards() + players[1].debugNumCards() !== 2 * 56) {
        throw new Error('Invalid number of cards in play');
    }

    console.log('_____________________________');
    console.log('Lake');
    for (var i = 0; i < lake.length; ++i) {
        var pile = lake[i];
        console.log(pile[pile.length - 1]);
    }
    players[0].debug();
    players[1].debug();
}
