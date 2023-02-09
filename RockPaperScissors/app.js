const computerChoiceDisplay = document.getElementById("computer_choice")
const userChoiceDisplay = document.getElementById("your_choice")
const resultDisplay = document.getElementById("result")
const possibleChoices = document.querySelectorAll("button")
let userChoice
let computerChoice

possibleChoices.forEach(possibleChoices => possibleChoices.addEventListener("click", (e) => {
    userChoice = e.target.id
    userChoiceDisplay.innerHTML = userChoice
    generateComputerChoice()
    getResult()
}) )

function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * possibleChoices.length) + 1
    console.log(randomNumber)
//mucho mejor con un switch
    if(randomNumber === 1){
        computerChoice = "rock"
    }
    if(randomNumber === 2){
        computerChoice = "scissors"
    }
    if(randomNumber === 3){
        computerChoice = "paper"
    }
    computerChoiceDisplay.innerHTML = computerChoice
}

function getResult() {
    if(computerChoice === userChoice) {
        result = "It's a draw!"
    }
    if(computerChoice === "rock" && userChoice === "paper") {
        result = "You win!"
    }
    if(computerChoice === "rock" && userChoice === "scissors") {
        result = "You lost!"
    }
    if(computerChoice === "paper" && userChoice === "scissors") {
        result = "You win!"
    }
    if(computerChoice === "paper" && userChoice === "rock") {
        result = "You lost!"
    }
    if(computerChoice === "scissors" && userChoice === "rock") {
        result = "You win!"
    }
    if(computerChoice === "scissors" && userChoice === "paper") {
        result = "You lost!"
    }
    resultDisplay.innerHTML = result
}