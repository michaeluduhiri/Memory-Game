/*
Create a list of all the card values
Create a blank array that temporarily stores card values
Create a rating system as the user plays the game
Add a timer when the user starts the game
*/
var cardImage = ['anchor', 'anchor', 'bicycle', 'bicycle', 'bolt', 'bolt', 'bomb', 'bomb', 'cube', 'cube', 'diamond', 'diamond', 'leaf', 'leaf', 'paper-plane-o', 'paper-plane-o'],
		cardOpen = [],
		cardMatch = 0,
		cardMoves = 0,
		$deck = jQuery('.deck'),
		$scorePanel = $('#score-panel'),
		$moveNum = $('.moves'),
		$ratingSystem = $('i'),
		$restart = $('.restart'),
		delay = 600,
		gameCards = cardImage.length / 3,
		rating3Stars = gameCards + 3,
		rating2Stars = gameCards + 6,
		rating1Star = gameCards + 9,
		//Add a timer variable
		timer = new Timer();
		//Event listener for the timer variable
		timer.addEventListener('secondsUpdated', function (e) {
        $('.timer').html(timer.getTimeValues().toString());
		});

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Initialize Game
function initMemoryGame() {
  var cards = shuffle(cardImage);
  $deck.empty();
  cardMatch = 0;
  cardMoves = 0;
  $moveNum.text('0');
//Loop to go over each card
  $ratingSystem.removeClass('fa-star-o').addClass('fa-star');
	for (var i = 0; i < cards.length; i++) {
		$deck.append($('<li class="card"><i class="fa fa-' + cards[i] + '"></i></li>'));
	}
//Listener event to reset and stop the timer
	addCardListener();
	timer.reset();
	timer.stop();
}

// Set the rating system
function setRating(cardMoves) {
	var rating = 3;
	if (cardMoves > rating3Stars && cardMoves < rating2Stars) {
		$ratingSystem.eq(2).removeClass('fa-star').addClass('fa-star-o');
		rating = 2;
	} else if (cardMoves > rating2Stars && cardMoves < rating1Star) {
		$ratingSystem.eq(1).removeClass('fa-star').addClass('fa-star-o');
		rating = 1;
	} else if (cardMoves > rating1Star) {
		$ratingSystem.eq(0).removeClass('fa-star').addClass('fa-star-o');
		rating = 0;
	}
	return { score: rating };
}

// End Game
function endGame(cardMoves, score) {
		allowEscapeKey: false,
		allowOutsideClick: false,
		title: 'Congratulations!',
		text: 'With ' + cardMoves + ' Moves and ' + score + ' Stars.',
		type: 'success',
		confirmButtonColor: '#02ccba',
		confirmButtonText: 'Play again!'
	}).then(function(isConfirm) {
		if (isConfirm) {
			initGame();
		}
}

// Restart Game
$restart.bind('click', function() {
    allowEscapeKey: false,
    allowOutsideClick: false,
    title: 'Are you sure?',
    text: "Your progress will be Lost!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#02ccba',
    cancelButtonColor: '#f95c3c',
    confirmButtonText: 'Yes, Restart Game!'
  }).then(function(isConfirm) {
    if (isConfirm) {
      initGame();
    }
});

var addCardListener = function() {

// Card flip
$deck.find('.card:not(".match, .open")').bind('click' , function() {
	if($('.show').length > 1) { return true; }
		if (timer.getTotalTimeValues().seconds === 0) {
			timer.start();
		}
		var $this = $(this),
		card = $this.context.innerHTML;
        $this.addClass('open show');
		cardOpen.push(card);

	// Compare with opened card
  if (cardOpen.length > 1) {
    if (card === cardOpen[0]) {
      $deck.find('.open').addClass('match animated infinite rubberBand');
      setTimeout(function() {
        $deck.find('.match').removeClass('open show animated infinite rubberBand');
      }, delay);
      cardMatch++;
    } else {
      $deck.find('.open').addClass('notmatch animated infinite wobble');
			setTimeout(function() {
				$deck.find('.open').removeClass('animated infinite wobble');
			}, delay / 1.5);
      setTimeout(function() {
        $deck.find('.open').removeClass('open show notmatch animated infinite wobble');
      }, delay);
    }
    cardOpen = [];
		cardMoves++;
		setRating(cardMoves);
		$moveNum.html(cardMoves);
  }

	// End Game if all cards match all cards
	if (gameCards === cardMatch) {
		setRating(cardMoves);
		var score = setRating(cardMoves).score;
		setTimeout(function() {
			endGame(cardMoves, score);
		}, 500);
		timer.stop();
  }
});
};

initMemoryGame();
