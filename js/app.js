//Create an array that holds all of your cards
 var cardImage = ['anchor', 'anchor', 'bicycle', 'bicycle', 'bolt', 'bolt', 'bomb', 'bomb', 'cube', 'cube', 'diamond', 'diamond', 'leaf', 'leaf', 'paper-plane-o', 'paper-plane-o'];

// Temporary store values in the array for comparison
var cardOpen = [];
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

//Initialize Game
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

function cardBoard(card,val){
  if (card.innerHTML == "" && cardOpen.length < 2) {
    card.style.background = '#FFF';
    card.innerHTML = val;
    if (cardOpen.length == 0) {
      cardOpen.push(val);
      cardValue.push(card.id);
    }
    else if (cardOpen.length == 1) {
      cardOpen.push(val);
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
				    // Flip the 2 tiles back over
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
				setTimeout(flip2Back, 100);
      }
    }
  }
}


//Let the games begin.
//initMemoryGame();
