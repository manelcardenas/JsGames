const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')
const bang = document.querySelector('.bang')
const cross = document.querySelector('.cross')
const timeLeft = document.querySelector('#time-left')
const socre = document.querySelector('#score')
const startButton = document.querySelector('.start-button')



let result = 0
let hitPosition
let currentTime = 40
let randomSquare
let timerId
let countMole

function randomSquares() {
    squares.forEach(square => {
        square.classList.remove('mole')
    })

    randomSquare = squares[Math.floor(Math.random() * 9)]
    randomSquare.classList.add('mole')

    hitPosition = randomSquare.id
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if(square.id == hitPosition){
            randomSquare.classList.add('bang')
            result++
            socre.textContent = result
            hitPosition = null
        } else if(square.id != hitPosition){
            square.classList.add('cross')
            setTimeout( () => square.classList.remove('cross'), 200)
            currentTime = currentTime - 2
        }
        setTimeout( () => randomSquare.classList.remove('bang'), 250)
    })
})

function moveMole() {
    countMole = setInterval(randomSquares, 1000)
}



function countDown() {
    currentTime--
    timeLeft.textContent = currentTime
    

    if (currentTime <= 0) {
        clearInterval(timerId)
        clearInterval(countMole)
        //document.removeEventListener('keyup', moveFrog)
        alert('GAME OVER! Your final score is '+ result)
    }
}


startButton.addEventListener('click', () => {
    
        timerId = setInterval(countDown, 1000)
        moveMole()
    
})
