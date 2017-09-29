//Create an array that holds all of your cards
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
	$restart = $('.restart');

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
 var card = function initMemoryGame() {
 	shuffle.cardImage;
	$deck.empthy();
	cardMatch = 0;
	cardMoves = 0;
	$numOfMoves.text('0');
	$rating.removeClass('fa-star-o').addClass('fa-star');
	 	//Loop over the cards array
		for (var i = 0; i < cardImage.length; i++) {
			$deck.append(S('<li class="card"><i class="fa fa-' + cards[i] + '"></i></li>'
		}
		addEventListener();
	};

//Event Listener for card click. When clicked, flip the card
$deck.find('.card:not(".match, .open")').bind('click' , function() {
	if($('.show').length > 1) {
		return true;
		}
	var $this = $(this),
	card = $this.context.innerHTML;
	$this.addClass('open show');
	opened.push(card);
	
	if (opened.length > 1) {
		if (card === opened[0]) {
			$deck.find('.open').addClass('match animated infinite rubberBand');
			setTimeout(function() {
			$deck.find('.match').removeClass('open show animated infinite rubberBand');
			}, delay);
			match++;
		} else {
			$deck.find('.open').addClass('notmatch animated infinite wobble');
			setTimeout(function() {
			$deck.find('.open').removeClass('animated infinite wobble');
			}, delay / 1.5);
			setTimeout(function() {
			$deck.find('.open').removeClass('open show notmatch animated infinite wobble');
			}, delay);
		}
			opened = [];
			moves++;
			setRating(moves);
			$moveNum.html(moves);
	}
})
//End Game	
function endGame (moves, score) {
	allowEscapeKey: false,
	allowOutsideClick: false,
	title: 'Congratulations!',
	text: 'You completed it with ' + moves + ' moves and ' + score + ' stars!',
	type: 'success',
	confirmButtonColor: '#02ccba',
	confirmButtonText: 'Play again!'
}).then(function(isConfirm) {
	if (isConfirm) {
		initGame();
		}
	})
}

function starRating(moves) {
	var rating = 3;
	if (moves > rating3Stars && moves < rating2Stars) {
		$ratingStars.eq(2).removeClass('fa-star').addClass('fa-star-o');
		rating = 2;
	} else if (moves > rank2Stars && moves < rating1Star) {
		$ratingStars.eq(1).removeClass('fa-star').addClass('fa-star-o');
		rating = 1;
	} else if (moves > rating1Star) {
		$ratingStars.eq(0).removeClass('fa-star').addClass('fa-star-o');
		rating = 0;
	}
	return { score: rating };
};

// Restart Game
$restart.bind('click', function() {
	allowEscapeKey: false,
	allowOutsideClick: false,
	showCancelButton: true,
	confirmButtonColor: '#02ccba',
	cancelButtonColor: '#f95c3c',
	confirmButtonText: 'Yes, Restart Game!'
	}).then(function(isConfirm) {
		if (isConfirm) {
			initGame();
		}
	})
});

//Let the games begin
inintMemoryGame();
