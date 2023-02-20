const grid = document.querySelector('.grid')
const text = document.querySelector(".text")
const resultDisplay = document.querySelector('.result')
const boomAudio = new Audio('boom.wav')
const music = new Audio('music.mp3')
const laserAudio = new Audio('laser.mp3')
let allienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

//fer nivells

let currentShooterIndex = 202
let width = 15
let direction = 1
let invadersId
let goingRight = true
let aliensRemoved = []
let results = allienInvaders.length
let levelTwo = false

for(let i = 0; i < 225; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)
}

let squares = Array.from(document.querySelectorAll('.grid div'))


function draw() {
    for(let i=0; i < allienInvaders.length; i++){
        if(!aliensRemoved.includes(i) && !levelTwo) {
            squares[allienInvaders[i]].classList.add('invader')
        }else if(!aliensRemoved.includes(i) && levelTwo){
            squares[allienInvaders[i]].classList.add('alliens')
        }

    }
}


function remove() {
    for(let i=0; i < allienInvaders.length; i++){
        squares[allienInvaders[i]].classList.remove('invader')
        squares[allienInvaders[i]].classList.remove('alliens')
    }
}

squares[currentShooterIndex].classList.add('shooter')

function moveShooter(e) {
    squares[currentShooterIndex].classList.remove('shooter')
    switch(e.key) {
        case 'ArrowLeft':
            if (currentShooterIndex % width !== 0) currentShooterIndex -=1
            break
        case 'ArrowRight':
            if(currentShooterIndex % width < width - 1) currentShooterIndex +=1
            break
    }
    squares[currentShooterIndex].classList.add('shooter')
}


function moveInvaders() {
    const leftEdge = allienInvaders[0] % width === 0
    const rightEdge = allienInvaders[allienInvaders.length - 1] % width === width - 1
    remove()

    if(rightEdge && goingRight) {
        for(let i=0; i < allienInvaders.length; i++){
            allienInvaders[i] += width + 1
            direction = -1
            goingRight = false
        }
    }

    if(leftEdge && !goingRight) {
        for(let i=0; i < allienInvaders.length; i++){
            allienInvaders[i] += width - 1
            direction = 1
            goingRight = true
        }
    }

    for(let i=0; i < allienInvaders.length; i++) {
        allienInvaders[i] += direction
    }

    draw()

    if(squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
        gameLost()
    }

    for(let i =0; i < allienInvaders.length; i++) {
        if(allienInvaders[i] > squares.length) {
            gameLost()
        }
    }

    if(aliensRemoved.length === allienInvaders.length) {
        levelCompleted()
    }
}

function levelCompleted() {
    if(levelTwo == false){
        results = allienInvaders.length
        clearInterval(invadersId)
        aliensRemoved = []
        allienInvaders = [
            0,1,2,3,4,5,6,7,8,9,
            15,16,17,18,19,20,21,22,23,24,
            30,31,32,33,34,35,36,37,38,39
        ]
        levelTwo = true
        goingRight = true
        draw()
        invadersId = setInterval(moveInvaders, 800)

    }
    // resultDisplay.innerHTML = 0
    // alert("You win!")
    // clearInterval(invadersId)
    // document.removeEventListener('keydown', moveShooter)
    // document.removeEventListener('keydown', shoot)
}

function gameLost() {
    alert("GAME OVER")
    clearInterval(invadersId)
    document.removeEventListener('keydown', moveShooter)
    document.removeEventListener('keydown', shoot)
}


function shoot(e) {
    let laserId
    let currentLaserIndex = currentShooterIndex
    
    function moveLaser() {

        if(currentLaserIndex >= 15){
            squares[currentLaserIndex].classList.remove('laser')
            currentLaserIndex -= width
            squares[currentLaserIndex].classList.add('laser')
        }
        else squares[currentLaserIndex].classList.remove('laser')

        if( squares[currentLaserIndex].classList.contains('invader') || 
            squares[currentLaserIndex].classList.contains('alliens')) 
        {
            squares[currentLaserIndex].classList.remove('laser')
            squares[currentLaserIndex].classList.remove('invader')
            squares[currentLaserIndex].classList.remove('alliens')
            squares[currentLaserIndex].classList.add('boom')
            boomAudio.currentTime = 0
            boomAudio.play()

            setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 300)
            clearInterval(laserId)

            let alienRemoved = allienInvaders.indexOf(currentLaserIndex)
            aliensRemoved.push(alienRemoved)
            results--
            resultDisplay.innerHTML = results
        }
    }

    switch(e.key) {
        case 'ArrowUp':
            laserAudio.currentTime = 0
            laserAudio.play()
            laserId = setInterval(moveLaser, 100)
    }
}



function startGame(e) {
    music.play()
    draw()
    if(e.key) { 
        grid.classList.add("active")
        text.classList.add("inactive")
        invadersId = setInterval(moveInvaders, 800)
        document.addEventListener('keydown', shoot)
        document.addEventListener('keydown', moveShooter)
        document.removeEventListener('keyup', startGame)
    }

}

document.addEventListener('keyup', startGame)