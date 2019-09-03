
class Cards {
    constructor() {
        this.cardArray = [
                            "url(./assets/images/articuno.jpg)",
                            "url(./assets/images/bulbasaur.jpg)", 
                            "url(./assets/images/charmander.jpg)",
                            "url(./assets/images/dragonite.jpg)",
                            "url(./assets/images/eevee.jpg)",
                            "url(./assets/images/mew.jpg)",
                            "url(./assets/images/mewtwo.jpg)",
                            "url(./assets/images/pikachu.jpg)",
                            "url(./assets/images/squirtle.jpg)"
                        ];
        this.cardsToAppend = this.cardArray.concat(this.cardArray);
        this.shuffledCards = null;
        this.shuffleArray = this.shuffleArray.bind(this);
        this.appendCards = this.appendCards.bind(this);
    }

    shuffleArray() {
        this.shuffledCards = this.cardsToAppend;
        let currentIndex = this.cardsToAppend.length, temporaryValue, randomIndex;
        
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);   // Fisher-Yates Shuffle to randomize array order
            currentIndex -= 1;
            temporaryValue = this.shuffledCards[currentIndex];
            this.shuffledCards[currentIndex] = this.shuffledCards[randomIndex];
            this.shuffledCards[randomIndex] = temporaryValue;
        }
    }

    appendCards() {      // changes the card background image with the newly randomized array
        this.shuffleArray();
        for (let index = 0; index < this.shuffledCards.length; index++ ) {
            $(".front:eq("+index+")").css('background-image', this.shuffledCards[index]);
        }    
    }
}