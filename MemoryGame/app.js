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
//si fallas perds temps
//posar contador y start button

//si fas un match que surti en verd i si falles ....

cardArray.sort(() => 0.5 - Math.random())


const resultDisplay = document.querySelector('#result')
const scoreDisplay = document.querySelector('#score')
const attempsLeftDisplay = document.querySelector('#attemps')

let gridDisplay = document.querySelector('#grid')
let card
let attempsId
let currentattemps = 10
let cardChosen = []
let cardsChosenIds = []
let cardsWon = []

function createBoard() {
    for(let i=0;i<cardArray.length;i++){
        card = document.createElement('img')
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
        cards[optionOne].setAttribute('src', 'images/blank.png')
        cards[optionTwo].setAttribute('src', 'images/blank.png')
        scoreDisplay.innerHTML = 'You clicked the same card twice!'
    }else if(cardChosen[0] == cardChosen[1]) {
        scoreDisplay.innerHTML = 'You found a match'
        cards[optionOne].setAttribute('src', 'images/white.png')
        cards[optionTwo].setAttribute('src', 'images/white.png')
        cards[optionOne].removeEventListener('click', flipCard)
        cards[optionTwo].removeEventListener('click', flipCard)
        cardsWon.push(cardChosen)
        currentattemps++
    } else {
        cards[optionOne].setAttribute('src', 'images/blank.png')
        cards[optionTwo].setAttribute('src', 'images/blank.png')
        scoreDisplay.innerHTML = 'Sorry try again!'
    }

    currentattemps--
    attempsLeftDisplay.textContent = currentattemps
    setTimeout( () => scoreDisplay.innerHTML = '', 1000)
    resultDisplay.textContent = cardsWon.length
    cardChosen = []
    cardsChosenIds = [] 

    if(cardsWon.length == (cardArray.length)/2) {
        scoreDisplay.innerHTML = 'Congratulations you found them all!'
    }

    if(currentattemps <= 0) {
        scoreDisplay.innerHTML = 'You lose!'
        delete gridDisplay
        console.log(typeof(gridDisplay))
        //gridDisplay = document.querySelector('#grid')
        createBoard()
        currentattemps = 10
        cardsWon = []
        resultDisplay.textContent = cardsWon.length
        attempsLeftDisplay.textContent = currentattemps
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