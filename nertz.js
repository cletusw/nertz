// Fisher-Yates shuffling algorithm
var shuffledDeck = [];
var j;
shuffledDeck[0] = DECK[0];
for (var i = 1; i <= DECK.length - 1; ++i) {
    j = Math.floor(Math.random() * (i + 1));
	shuffledDeck[i] = shuffledDeck[j];
	shuffledDeck[j] = DECK[i];
}

var nertzPile = [];
for (var i = 0; i < 12; ++i) {
    nertzPile.push(shuffledDeck.pop());
}

var river = [];
for (var i = 0; i < 4; ++i) {
    river.push(shuffledDeck.pop());
}

var lake = [];

function playIfPossible(card) {
    if (card.value === 1) {
        lake.push([card]);
        return true;
    }

    for (var i = 0; i < lake.length; ++i) {
        var pile = lake[i];
        var top = pile[pile.length - 1];
        if (card.color === top.color && card.value === top.value + 1) {
            pile.push(card);
            return true;
        }
    }

    return false;
}

function checkForVictory() {
    if (nertzPile.length === 0) {
        throw new Error('Victory!');
    }
}

var tempDeck = [];

function threeToTempDeck() {
    tempDeck.push(shuffledDeck.pop());
    if (shuffledDeck.length) {
        tempDeck.push(shuffledDeck.pop());
        if (shuffledDeck.length) {
            tempDeck.push(shuffledDeck.pop());
        }
    }
}

threeToTempDeck();

function takeTurn() {
    if (playIfPossible(nertzPile[nertzPile.length - 1])) {
        nertzPile.pop();
        checkForVictory();
    }
    else if (playIfPossible(river[0])) {
        river[0] = nertzPile.pop();
        checkForVictory();
    }
    else if (playIfPossible(river[1])) {
        river[1] = nertzPile.pop();
        checkForVictory();
    }
    else if (playIfPossible(river[2])) {
        river[2] = nertzPile.pop();
        checkForVictory();
    }
    else if (playIfPossible(river[3])) {
        river[3] = nertzPile.pop();
        checkForVictory();
    }
    else {
        if (!tempDeck.length) {
            throw new Error('tempDeck not refilled');
        }

        if (playIfPossible(tempDeck[tempDeck.length - 1])) {
            tempDeck.pop();
            if (!tempDeck.length) {
                threeToTempDeck();
            }
        }
        else {
            if (!shuffledDeck.length) {
                tempDeck.reverse();
                shuffledDeck = tempDeck;
                tempDeck = [];
                // Optional:
                shuffledDeck.unshift(shuffledDeck.pop());
            }
            threeToTempDeck();
        }
    }
    var lakeSize = 0;
    for (var i = 0; i < lake.length; ++i) {
        lakeSize += lake[i].length;
    }
    if (lakeSize + nertzPile.length + 4 + tempDeck.length + shuffledDeck.length !== 56) {
        throw new Error('Invalid number of cards in play');
    }
    debug();
}

function debug() {
    console.log('_____________________________');
    console.log('Lake');
    for (var i = 0; i < lake.length; ++i) {
        var pile = lake[i];
        console.log(pile[pile.length - 1]);
    }
    console.log('Nertz top: ' + (!nertzPile.length || JSON.stringify(nertzPile[nertzPile.length - 1])));
    console.log('River: ' + JSON.stringify(river));
    console.log('tempDeck top: ' + (!tempDeck.length || JSON.stringify(tempDeck[tempDeck.length - 1])));
    console.log('shuffledDeck.length: ' + shuffledDeck.length);
}

var intervalId;

function start() {
    debug();
    intervalId = setInterval(takeTurn, 50);
}

function stop() {
    clearInterval(intervalId);
}
