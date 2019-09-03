$(document).ready(initializeApp);

function initializeApp() {
    $('.card').click(handleCardClick);
    $('.card').click(displayStats);

    shuffleArray(cardsToAppend); // shuffle card array on page load
    shuffleCards(cardsToAppend);          // shuffle cards on the page 

    $('.close').click(function() { // shuffle cards when game is won and user clicks play again
        shuffleArray(cardsToAppend);
        shuffleCards(cardsToAppend);
    });
}

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var maxMatches = 1;
var attempts = 0;
var gamesPlayed = 0;
var firstCardClickedImage = null;
var secondCardClickedImage = null;
var noClickable = false; //** review **/
//
var cardArray = ["url(./../assets/images/articuno.jpg)",
                 "url(./../assets/images/bulbasaur.jpg)", 
                 "url(./../assets/images/charmander.jpg)",
                 "url(./../assets/images/dragonite.jpg)",
                 "url(./../assets/images/eevee.jpg)",
                 "url(./../assets/images/mew.jpg)",
                 "url(./../assets/images/mewtwo.jpg)",
                 "url(./../assets/images/pikachu.png)",
                 "url(./../assets/images/squirtle.jpg)"
                ];
var cardsToAppend = cardArray.concat(cardArray);                
          
function handleCardClick (event) {
    if(noClickable) { //** review **/
        return;
    }
    $(event.currentTarget).toggleClass('isFlipped');
    if (firstCardClicked === null) {
        firstCardClicked = $(event.currentTarget);
        firstCardClickedImage = firstCardClicked.find('div:nth-child(2)').css('background-image');
        firstCardClicked.css('pointer-events', 'none'); // prevents card from being clicked again once flipped
        
    } else if (secondCardClicked === null) {
        secondCardClicked = $(event.currentTarget);
        secondCardClickedImage = secondCardClicked.find('div:nth-child(2)').css('background-image');
        secondCardClicked.css('pointer-events', 'none'); // prevents card from being clicked again once flipped
        attempts++;
    }
    
    if (firstCardClickedImage === secondCardClickedImage) {
        console.log('cards match');
        firstCardClicked = null;
        firstCardClickedImage = null;
        secondCardClicked = null;
        secondCardClickedImage = null;
        matches++;
        noClickable = false; //** review **/
    } else if (firstCardClicked === null || secondCardClicked === null) {
        return;
    } else if (firstCardClickedImage !== secondCardClickedImage) {
        noClickable = true; //** review **/
        setTimeout( function () {
            firstCardClicked.toggleClass('isFlipped');
            firstCardClicked.css('pointer-events', ''); // allows for card to be clicked again once flipped back over
            firstCardClicked = null;
            firstCardClickedImage = null;
            noClickable = false; //** review **/
        }, 1500);
        setTimeout( function () {
            secondCardClicked.toggleClass('isFlipped');
            secondCardClicked.css('pointer-events', '');  // allows for card to be clicked again once flipped back over
            secondCardClicked = null;
            secondCardClickedImage = null;
            noClickable = false; //** review **/
        }, 1500);
    }

    var modal = document.getElementById("myModal");
    var button = document.getElementsByClassName("close")[0];

    if (matches === maxMatches) {
        setTimeout( function () {
            modal.style.display = "block";
            resetStats();
        }, 1000)
    }
    button.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        }
    }
}

function calculateAccuracy () {
    return matches/attempts;
}

function displayStats () {
    var accuracy = calculateAccuracy()*100;
    $('aside > div:nth-child(5)').text(attempts);
    if ($('aside > div:last-child').text() === "NaN%") {
        $('aside > div:last-child').text('0%');
    } else {
        $('aside > div:last-child').text(Math.floor(accuracy) + "%");
    }
    $('aside > div:nth-child(3)').text(gamesPlayed);
}

function resetStats () {
    matches = 0;
    attempts = 0;
    gamesPlayed++;
    displayStats();
    $('.card').removeClass('isFlipped');
    $('.card').css('pointer-events', '');
    $('aside > div:last-child').text('0%');
}

function shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);   // Fisher-Yates Shuffle to randomize array order
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function shuffleCards (array) {      // changes the card background image with the newly randomized array
    for (index = 0; index < array.length; index++ ) {
        $(".front:eq("+index+")").css('background-image', array[index]);
    }    
}

