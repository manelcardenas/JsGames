const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('.result')
const allienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]
//quitar fondo al proyectil
//posar boton de start
//fer nivells

let currentShooterIndex = 202
let width = 15
let direction = 1
let invadersId
let goingRight = true
let aliensRemoved = []
let results = allienInvaders.length

for(let i = 0; i < 255; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))


function draw() {
    for(let i=0; i < allienInvaders.length; i++){
        if(!aliensRemoved.includes(i)) {
            squares[allienInvaders[i]].classList.add('invader')
        }
    }
}

draw()

function remove() {
    for(let i=0; i < allienInvaders.length; i++){
        squares[allienInvaders[i]].classList.remove('invader')
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

document.addEventListener('keydown', moveShooter)

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
        alert("GAME OVER")
        clearInterval(invadersId)
        document.removeEventListener('keydown', moveShooter)
        document.removeEventListener('keydown', shoot)
    }

    for(let i =0; i < allienInvaders.length; i++) {
        if(allienInvaders[i] > squares.length) {
            alert("GAME OVER")
            clearInterval(invadersId)
            document.removeEventListener('keydown', moveShooter)
            document.removeEventListener('keydown', shoot)
        }
    }

    if(aliensRemoved.length === allienInvaders.length) {
        resultDisplay.innerHTML = 0
        alert("You win!")
        clearInterval(invadersId)
        document.removeEventListener('keydown', moveShooter)
        document.removeEventListener('keydown', shoot)
    }
}

invadersId = setInterval(moveInvaders, 800)

function shoot(e) {
    let laserId
    let currentLaserIndex = currentShooterIndex
    
    function moveLaser() {
        squares[currentLaserIndex].classList.remove('laser')
        currentLaserIndex -= width
        squares[currentLaserIndex].classList.add('laser')

        if(squares[currentLaserIndex].classList.contains('invader')) {
            squares[currentLaserIndex].classList.remove('laser')
            squares[currentLaserIndex].classList.remove('invader')
            squares[currentLaserIndex].classList.add('boom')

            setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 300)
            clearInterval(laserId)

            const alienRemoved = allienInvaders.indexOf(currentLaserIndex)
            aliensRemoved.push(alienRemoved)
            results--
            resultDisplay.innerHTML = results
        }
    }

    switch(e.key) {
        case 'ArrowUp':
            laserId = setInterval(moveLaser, 100)
    }
}

document.addEventListener('keydown', shoot)