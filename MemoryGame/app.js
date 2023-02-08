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

cardArray.sort(() => 0.5 - Math.random())

const gridDisplay = document.querySelector('#grid')
const resultDisplay = document.querySelector('#result')
let cardChosen = []
let cardsChosenIds = []
const cardsWon = []

function createBoard() {
    for(let i=0;i<cardArray.length;i++){
        const card = document.createElement('img')
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute('data-id',i)
        card.addEventListener('click', flipCard)
        gridDisplay.append(card)
    }
}

createBoard()

function checkMatch() {
    const cards = document.querySelectorAll('img')
    const optionOne = cardsChosenIds[0]
    const optionTwo = cardsChosenIds[1]

    if(optionOne == optionTwo){
        alert('You have clicked the same image!')
        cards[optionOne].setAttribute('src', 'images/blank.png')
        cards[optionTwo].setAttribute('src', 'images/blank.png')
    }

    if(cardChosen[0] == cardChosen[1]) {
        alert('You found a match!')
        cards[optionOne].setAttribute('src', 'images/white.png')
        cards[optionTwo].setAttribute('src', 'images/white.png')
        cards[optionOne].removeEventListener('click', flipCard)
        cards[optionTwo].removeEventListener('click', flipCard)
        cardsWon.push(cardChosen)
    } else {
        cards[optionOne].setAttribute('src', 'images/blank.png')
        cards[optionTwo].setAttribute('src', 'images/blank.png')
        alert('sorry try again!')
    }

    resultDisplay.textContent = cardsWon.length
    cardChosen = []
    cardsChosenIds = [] 

    if(cardsWon.length == (cardArray.length)/2) {
        resultDisplay.textContent = 'Congratulations you found them all!'
    }
}

function flipCard() {
    const cardId = this.getAttribute('data-id')
    cardChosen.push(cardArray[cardId].name)
    cardsChosenIds.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if(cardChosen.length === 2){
        setTimeout(checkMatch, 500)
    }
}