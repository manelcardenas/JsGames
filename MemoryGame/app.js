const cardArray = [
    {
        name: 'fries',
        img:'images/fries.png',
    },
    {
        name: 'cheeseburger',
        img:'images/cheeseburger.png',
    },
    {
        name: 'hotdog',
        img:'images/hotdog.png',
    },
    {
        name: 'ice-cream',
        img:'images/ice-cream.png',
    },
    {
        name: 'milkshake',
        img:'images/milkshake.png',
    },
    {
        name: 'pizza',
        img:'images/pizza.png',
    },
    {
        name: 'fries',
        img:'images/fries.png',
    },
    {
        name: 'cheeseburger',
        img:'images/cheeseburger.png',
    },
    {
        name: 'hotdog',
        img:'images/hotdog.png',
    },
    {
        name: 'ice-cream',
        img:'images/ice-cream.png',
    },
    {
        name: 'milkshake',
        img:'images/milkshake.png',
    },
    {
        name: 'pizza',
        img:'images/pizza.png',
    }
]

// en cas de perdre, que torni a començcar automaticament


const resultDisplay = document.querySelector('#result');
const scoreDisplay = document.querySelector('#score');
const attemptsLeftDisplay = document.querySelector('#attempts');

let gridDisplay = document.querySelector('#grid');
let card;
let currentAttempts = 8;
let cardChosen = [];
let cardsChosenIds = [];
let cardsWon = [];
let partida = 0;
let gameStarted = false;

function startGame() {
    cardArray.sort(() => 0.5 - Math.random());
    createBoard();
    partida = 1;
    gameStarted = true;
}

function restartGame() {
    deleteBoard();
    cardArray.sort(() => 0.5 - Math.random());
    createBoard();
    currentAttempts = 8;
    cardsWon = [];
    resultDisplay.textContent = cardsWon.length;
    attemptsLeftDisplay.textContent = currentAttempts;
    cardChosen = [];
    cardsChosenIds = [];
    partida = 1;
    gameStarted = true;
}

function deleteBoard() {
    while (gridDisplay.firstChild) {
        gridDisplay.removeChild(gridDisplay.firstChild);
    }
}

function checkMatch() {
    const cards = document.querySelectorAll('img');
    const optionOne = cardsChosenIds[0];
    const optionTwo = cardsChosenIds[1];

    if (optionOne == optionTwo) {
        cards[optionOne].setAttribute('src', 'images/blank.png');
        cards[optionTwo].setAttribute('src', 'images/blank.png');
        scoreDisplay.innerHTML = 'You clicked the same card twice!';
    } else if (cardChosen[0] == cardChosen[1]) {
        scoreDisplay.innerHTML = 'You found a match';
        cards[optionOne].setAttribute('src', 'images/white.png');
        cards[optionTwo].setAttribute('src', 'images/white.png');
        cards[optionOne].removeEventListener('click', flipCard);
        cards[optionTwo].removeEventListener('click', flipCard);
        cardsWon.push(cardChosen);
        currentAttempts++;
    } else {
        cards[optionOne].setAttribute('src', 'images/blank.png');
        cards[optionTwo].setAttribute('src', 'images/blank.png');
        scoreDisplay.innerHTML = 'Sorry, try again!';
    }

    currentAttempts--;
    attemptsLeftDisplay.textContent = currentAttempts;
    setTimeout(() => scoreDisplay.innerHTML = '', 1000);
    resultDisplay.textContent = cardsWon.length;
    cardChosen = [];
    cardsChosenIds = [];

    if (cardsWon.length == cardArray.length / 2) {
        alert('Congratulations, you found them all!');
        restartGame();
    }

    if (currentAttempts <= 0) {
        if (confirm('You lose! Do you want to play again?')) {
          restartGame();
        } else {
          gameStarted = false;
        }
      }
}

function flipCard() {
    const cardId = this.getAttribute('data-id');
    cardChosen.push(cardArray[cardId].name);
    cardsChosenIds.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);

    if (!gameStarted) {
        return; // Don't allow flipping cards before starting the game
    }

    if (cardChosen.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        card = document.createElement('img');
        card.setAttribute('src', 'images/blank.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        gridDisplay.appendChild(card);
    }
}

startGame();
