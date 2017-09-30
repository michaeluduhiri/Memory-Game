/**
Create a list of all the card values
Create a blank array that temporarily stores card values
Create variables to capture the card's value
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

/**
* Shuffle function from http://stackoverflow.com/a/2450976
*/
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

/**
* Behavior: The board is randomly shuffled everytime the game is initialized.
* Input: The card's value
*	Output: Randomly shuffled cards, star rating system, timer, event Listener
	to begin the timer when the first card is clicked.
*/
function initMemoryGame() {

  var cards = shuffle(cardImage);
  $deck.empty();
  cardMatch = 0;
  cardMoves = 0;
  $moveNum.text('0');
  $ratingSystem.removeClass('fa-star-o').addClass('fa-star');

	//Loop to go over each card
	for (var i = 0; i < cards.length; i++) {
		$deck.append($('<li class="card"><i class="fa fa-' + cards[i] + '"></i></li>'));
	}
//Listener event to reset and stop the timer
	addCardListener();
	timer.reset();
	timer.stop();
}

/**
* Behavior: Set if statement where the number of moves the user makes 'decreases' the star
*	Input: Number of moves user makes
*	Output: The star 'decreases' by replacing a filled in star with a blank star
*/

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

/**
* Behavior: When the user completes the game, display a Congratulatory note, the time it took to complete, the number of moves left and the stars left.
* Input: N/A
* Output: Congratulatory note, timer, number of movies, score
*/
function endGame(cardMoves, score) {
	swal({
		allowEscapeKey: false,
		allowOutsideClick: false,
		title: 'Congratulations!',
		text: 'You completed the game in ' + timer + ', with' + cardMoves + ' Moves and ' + score + ' Stars.',
		type: 'success',
		confirmButtonColor: '#02ccba',
		confirmButtonText: 'Play again!'
		}).then(function(isConfirm) {
		if (isConfirm) {
			initMemoryGame();
		}
	})
}

/**
* Behavior: Allow user to quit the game by clicking the reset button
* Input:N/A
*	Output: Reset key, message prompts if user is sure they want to quit
*/
$restart.bind('click', function() {
	swal({	
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
			initMemoryGame();
    		}
	})
});

/**
* Behavior: Listen to the click event listener and check if the card has been flipped. Compare with the next card clicked
*	Input: Click
*	Output: Compare cards flipped
*/
var addCardListener = function() {
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
