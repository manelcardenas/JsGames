const timeLeftDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector('#result')
const startPauseButton = document.querySelector('.start-button')
const squares = document.querySelectorAll('.grid div')
const logsLeft = document.querySelectorAll('.log-left')
const logsRight = document.querySelectorAll('.log-right')
const carsLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll('.car-right')

//fer nivells

let timerId
let currentTime = 20
let currentIndex = 76
let outcomeTimerId
const width = 9
console.log(squares)


function moveFrog(e) {
    squares[currentIndex].classList.remove('frog')
    squares[currentIndex].classList.remove('frog-left')
    squares[currentIndex].classList.remove('frog-right')
    squares[currentIndex].classList.remove('frog-back')
    switch(e.key) {
        case 'ArrowLeft' :
            if(currentIndex % width !== 0){
                currentIndex -= 1
                squares[currentIndex].classList.add('frog-left')
            }
            else squares[currentIndex].classList.add('frog-left')
            break
        case 'ArrowRight' :
            if(currentIndex % width < width - 1) {
                currentIndex += 1
                squares[currentIndex].classList.add('frog-right')
            }
            else squares[currentIndex].classList.add('frog-right')
            break
        case 'ArrowUp' :
            if(currentIndex - width >= 0) {
                currentIndex -= width
                squares[currentIndex].classList.add('frog')
            }
            else squares[currentIndex].classList.add('frog')
            break
        case 'ArrowDown' :
            if(currentIndex + width < width * width) {
                currentIndex += width
                squares[currentIndex].classList.add('frog-back')
            }
            else squares[currentIndex].classList.add('frog-back')
            break
    }
    
}

function autoMoveElements() {
    currentTime--
    timeLeftDisplay.textContent = currentTime
    logsLeft.forEach(logLeft => moveLogLeft(logLeft))
    logsRight.forEach(logRight => moveLogRight(logRight))
    carsLeft.forEach(carLeft => moveCarLeft(carLeft))
    carsRight.forEach(carRight => moveCarRight(carRight))
}

function checkOutcomes() {
    lose()
    win()
}

function moveLogLeft(logLeft) {
    switch(true) {
        case logLeft.classList.contains('l1'):
            logLeft.classList.remove('l1')
            logLeft.classList.add('l2')
            break
        case logLeft.classList.contains('l2'):
            logLeft.classList.remove('l2')
            logLeft.classList.add('l3')
            break
        case logLeft.classList.contains('l3'):
            logLeft.classList.remove('l3')
            logLeft.classList.add('l4')
            break
        case logLeft.classList.contains('l4'):
            logLeft.classList.remove('l4')
            logLeft.classList.add('l5')
            break
        case logLeft.classList.contains('l5'):
            logLeft.classList.remove('l5')
            logLeft.classList.add('l1')
            break
    }
}

function moveLogRight(logRight) {
    switch(true) {
        case logRight.classList.contains('l1'):
            logRight.classList.remove('l1')
            logRight.classList.add('l5')
            break
        case logRight.classList.contains('l2'):
            logRight.classList.remove('l2')
            logRight.classList.add('l1')
            break
        case logRight.classList.contains('l3'):
            logRight.classList.remove('l3')
            logRight.classList.add('l2')
            break
        case logRight.classList.contains('l4'):
            logRight.classList.remove('l4')
            logRight.classList.add('l3')
            break
        case logRight.classList.contains('l5'):
            logRight.classList.remove('l5')
            logRight.classList.add('l4')
            break
    }
}

function moveCarLeft(carLeft) {
    switch(true) {
        case carLeft.classList.contains('c1'):
            carLeft.classList.remove('c1')
            carLeft.classList.add('c2')
            break
        case carLeft.classList.contains('c2'):
            carLeft.classList.remove('c2')
            carLeft.classList.add('c3')
            break
        case carLeft.classList.contains('c3'):
            carLeft.classList.remove('c3')
            carLeft.classList.add('c1')
            break
    }
}

function moveCarRight(carRight) {
    switch(true) {
        case carRight.classList.contains('d1'):
            carRight.classList.remove('d1')
            carRight.classList.add('d3')
            break
        case carRight.classList.contains('d2'):
            carRight.classList.remove('d2')
            carRight.classList.add('d1')
            break
        case carRight.classList.contains('d3'):
            carRight.classList.remove('d3')
            carRight.classList.add('d2')
            break
    }
}

function lose() {
    if(
        squares[currentIndex].classList.contains('c1') ||
        squares[currentIndex].classList.contains('d1') ||
        squares[currentIndex].classList.contains('l4') ||
        squares[currentIndex].classList.contains('l5') ||
        currentTime <= 0
    ) {
        resultDisplay.textContent = 'YOU LOSE'
        clearInterval(timerId)
        clearInterval(outcomeTimerId)
        squares[currentIndex].classList.remove('frog')
        document.removeEventListener('keyup', moveFrog)
    }
}

function win() {
    if(squares[currentIndex].classList.contains('ending-block')){
        resultDisplay.textContent = 'YOU WIN!'
        clearInterval(timerId)
        clearInterval(outcomeTimerId)
        document.removeEventListener('keyup', moveFrog)
    }
}


function startGame(e) {
    if(e.key == 'ArrowUp') {
        timerId = setInterval(autoMoveElements, 1000)
        outcomeTimerId = setInterval(checkOutcomes, 50)
        document.addEventListener('keyup', moveFrog)
        document.removeEventListener('keyup', startGame)
    }

}

document.addEventListener('keyup', startGame)

// startPauseButton.addEventListener('click', () => {
//     if(timerId) {
//         clearInterval(timerId)
//         clearInterval(outcomeTimerId)
//         outcomeTimerId = null
//         timerId = null
//         document.removeEventListener('keyup', moveFrog)
//     } else {
//         timerId = setInterval(autoMoveElements, 1000)
//         outcomeTimerId = setInterval(checkOutcomes, 50)
//         document.addEventListener('keyup', moveFrog)
//     }
// })
