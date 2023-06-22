// vars

// select dom elements
var startButton = document.querySelector('.start-button')
var resetButton = document.querySelector('.reset-button')
var timerEl = document.querySelector('.timer-count')
var wordBlanksEl = document.querySelector('.word-blanks')
var winsEl = document.querySelector('.win')
var lossesEl = document.querySelector('.lose')
var wins = 0
var losses = 0
var time = 10
// list of words
var words = ["jellyfish", "pancakes", "callback", "bacon", "porcupine"]
var userGuesses = [] // list of letters guessed by user
var answer
var intervalId

function getRandomWord() {
  var randomIdx = Math.floor( Math.random() * words.length )
  answer = words[randomIdx]
  console.log(answer)
}

function renderWord() {
  var blanks = ""
  for (var i = 0; i < answer.length; i++) {
    var letter = answer[i]
    // check if userGuesses contains current letter
    if (userGuesses.includes(letter)) {
      blanks += letter
    } else {
      blanks += "_"
    }    
  }
  wordBlanksEl.innerText = blanks.split('').join(' ')
}

function tick() {
  console.log('Tick...')
  // check if userGuesses has all letters that are in answer string
  // if has guess all letters
  if (!wordBlanksEl.innerText.includes("_")) {
    // end round
    wins++
    wordBlanksEl.innerText = "you won!"
  } else {
    // are we out of time?
    if (time <= 0) {
      clearInterval(intervalId)
      timerEl.innerText = "Out of time!"
      // diplay "lost round"
      // increment losses
    } else {
      // decrement timer count
      time--
      // display count in page
      timerEl.innerText = time
    } 
  }
}

function startRound() {
  getRandomWord()
  renderWord()
  intervalId = setInterval(tick, 1000)
}

function onKeydown(event) {
  // check if letter pressed is in the answer string
  // and if not already guessed
  if ( answer.includes(event.key) && !userGuesses.includes(event.key)  ) {
    userGuesses.push(event.key)
  }
  renderWord()
}



// Event Listeners
startButton.addEventListener('click', startRound)

document.body.addEventListener('keypress', onKeydown)

// TODO: reset