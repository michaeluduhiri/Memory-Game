//Create an array that holds all of your cards
 var cardImage = ['anchor', 'anchor', 'bicycle', 'bicycle', 'bolt', 'bolt', 'bomb', 'bomb', 'cube', 'cube', 'diamond', 'diamond', 'leaf', 'leaf', 'paper-plane-o', 'paper-plane-o'];

//Temporarily store the card's image in the array for comparison
var cardOpen = [];
//Temporarily store the card's id
var cardValue = [];
// Track the number of cards that have been flipped
var cardFlip = 0;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
}

//Create a new board for the memory game. Everytime the board is created, the cards are reset
function initMemoryGame() {
  cardFlip = 0;
  var card = '';
  cardImage.shuffle();
//Loop over the cards
  for (var i = 0; i < cardImage.length; i++) {
    card += '<div id="card_'+i+'" onclick="cardBoard(this,\''+cardImage[i]+'\')"></div>';
  }
  document.getElementbyId('memory_game').innerHTML = card;
}
//window.addEventListener("click", initMemoryGame)

function cardBoard(card,image){
  if (card.innerHTML == "" && cardOpen.length < 2) {
    card.style.background = '#FFF';
    card.innerHTML = image;
    if (cardOpen.length == 0) {
      cardOpen.push(image);
      cardValue.push(card.id);
    }
    else if (cardOpen.length == 1) {
      cardOpen.push(image);
      cardValue.push(card.id);
    if (cardOpen[0] == cardOpen[1]){
      cardFlip += 2;
      cardOpen = [];
      cardValue = [];

      if (cardFlip == cardImage.length) {
        alert ("Board cleared...generating new board");
        document.getElementbyId('memory_game').innerHTML = "";
        initMemoryGame();
      }
    }
    else {
function flipCardBack() {
	// Flip the 2 cards back over
	var card_1 = document.getElementById(cardValue[0]);
	var card_2 = document.getElementById(cardValue[1]);
	card_1.style.background = 'url(../img/geometry2.png) no-repeat';
  	card_1.innerHTML = "";
	card_2.style.background = 'url(../img/geometry2.png) no-repeat';
  	card_2.innerHTML = "";
	// Clear both arrays
	cardOpen = [];
  	cardValue = [];
	}
	setTimeout(flipCardBack, 1000);
      }
    }
  }
}


//Let the games begin.
//initMemoryGame();








/*
 * Create a list that holds all of your cards
 */
var cardImage = ['anchor', 'anchor', 'bicycle', 'bicycle', 'bolt', 'bolt', 'bomb', 'bomb', 'cube', 'cube', 'diamond', 'diamond', 'leaf', 'leaf', 'paper-plane-o', 'paper-plane-o'],
	cardOpen = [],
    	cardMatch = 0,
	cardMoves = 0,
    	cardFlip = 0,
    	$rating = $('i'),
    	ratingSystem = cardImage.length / 3,
    	rating3Stars = ratingSystem + 3,
	rating2Stars = ratingSystem + 6,
	rating1Stars = ratingSystem + 9,
    	$restart = $('.restart'),
    	$numOfMoves = $('.moves'),

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 var card = function initMemoryGame() {
 	shuffle.cardImage;
	cardMatch = 0;
	cardMoves = 0;
	$numOfMoves.text('0')
	$rating.removeClass('fa-star-o').addClass('fa-star');
		for (var i = 0; i < cardImage.length; i++) {
			$deck.append(S('<li class="card"><i class="fa fa-' + cards[i] + '"></i></li>'
	
	}
 
 
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

