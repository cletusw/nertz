function ComputerPlayer(lake) {
    this._lake = lake;

    // Fisher-Yates shuffling algorithm
    this._shuffledDeck = [];
    var j;
    this._shuffledDeck[0] = DECK[0];
    for (var i = 1; i <= DECK.length - 1; ++i) {
        j = Math.floor(Math.random() * (i + 1));
        this._shuffledDeck[i] = this._shuffledDeck[j];
        this._shuffledDeck[j] = DECK[i];
    }

    this._nertzPile = [];
    for (var i = 0; i < 12; ++i) {
        this._nertzPile.push(this._shuffledDeck.pop());
    }

    this._river = [];
    for (var i = 0; i < 4; ++i) {
        this._river.push(this._shuffledDeck.pop());
    }

    this._tempDeck = [];
    this._threeToTempDeck();
}

ComputerPlayer.prototype.takeTurn = function () {
    if (this._playIfPossible(this._nertzPile[this._nertzPile.length - 1])) {
        this._nertzPile.pop();
        this._checkForVictory();
    }
    else if (this._playIfPossible(this._river[0])) {
        this._river[0] = this._nertzPile.pop();
        this._checkForVictory();
    }
    else if (this._playIfPossible(this._river[1])) {
        this._river[1] = this._nertzPile.pop();
        this._checkForVictory();
    }
    else if (this._playIfPossible(this._river[2])) {
        this._river[2] = this._nertzPile.pop();
        this._checkForVictory();
    }
    else if (this._playIfPossible(this._river[3])) {
        this._river[3] = this._nertzPile.pop();
        this._checkForVictory();
    }
    else {
        if (!this._tempDeck.length) {
            throw new Error('this._tempDeck not refilled');
        }

        if (this._playIfPossible(this._tempDeck[this._tempDeck.length - 1])) {
            this._tempDeck.pop();
            if (!this._tempDeck.length) {
                this._threeToTempDeck();
            }
        }
        else {
            if (!this._shuffledDeck.length) {
                this._tempDeck.reverse();
                this._shuffledDeck = this._tempDeck;
                this._tempDeck = [];
                // Optional:
                this._shuffledDeck.unshift(this._shuffledDeck.pop());
            }
            this._threeToTempDeck();
        }
    }
}

ComputerPlayer.prototype.debug = function() {
    console.log('Nertz top: ' + (!this._nertzPile.length || JSON.stringify(this._nertzPile[this._nertzPile.length - 1])));
    console.log('River: ' + JSON.stringify(this._river));
    console.log('tempDeck top: ' + (!this._tempDeck.length || JSON.stringify(this._tempDeck[this._tempDeck.length - 1])));
    console.log('shuffledDeck.length: ' + this._shuffledDeck.length);
}

ComputerPlayer.prototype.debugNumCards = function() {
    return this._nertzPile.length + 4 + this._tempDeck.length + this._shuffledDeck.length;
}

ComputerPlayer.prototype._checkForVictory = function () {
    if (this._nertzPile.length === 0) {
        throw new Error('Victory!');
        debugger;
    }
}

ComputerPlayer.prototype._playIfPossible = function (card) {
    if (card.value === 1) {
        this._lake.push([card]);
        return true;
    }

    for (var i = 0; i < this._lake.length; ++i) {
        var pile = this._lake[i];
        var top = pile[pile.length - 1];
        if (card.color === top.color && card.value === top.value + 1) {
            pile.push(card);
            return true;
        }
    }

    return false;
}

ComputerPlayer.prototype._threeToTempDeck = function () {
    this._tempDeck.push(this._shuffledDeck.pop());
    if (this._shuffledDeck.length) {
        this._tempDeck.push(this._shuffledDeck.pop());
        if (this._shuffledDeck.length) {
            this._tempDeck.push(this._shuffledDeck.pop());
        }
    }
}
