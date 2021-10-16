// Abdulrazzak Jouhar 2021

var elements = document.querySelectorAll(".element")
var score = document.getElementById('score')
var grid = [[],[],[],[],[],[],[],[],[],[]]
fill()

let playerScore = 0
let running = true

class Red 
{
    constructor(lenght,deriction,xpos,ypos) {
        this.lenght = lenght
        this.deriction = deriction
        this.xpos = xpos
        this.ypos = ypos
    }
}

var redSpot = new Red(1,'f',0,0)
setHead(redSpot)

let handleIn = (event) => {
    if (!running) return

    if (event.key == "ArrowUp") {
        redSpot.deriction = 'u'
        setHead(redSpot)
    }
    else if (event.key == "ArrowDown") {
        redSpot.deriction = 'd'
        setHead(redSpot)
    }
    else if (event.key == "ArrowLeft") {
        redSpot.deriction = 'l'
        setHead(redSpot)
    }
    else if (event.key == "ArrowRight") {
        redSpot.deriction = 'r'
        setHead(redSpot)
    }
}

setListeners()

var once = true
setRandom()

let period = 60
const timeD = document.getElementById('timer')
var timer = setInterval(() => {
    if (period <= 10) timeD.style.color = 'red'
    timeD.innerHTML = 'Timer: ' + period
    
    if (period == 0) {
        let elm = document.createElement('button')
        elm.innerHTML = 'Play again'
        elm.setAttribute('onClick', 'location.reload()')
        timeD.innerHTML = ''
        timeD.appendChild(elm)
        score.style.color = 'green'
        clearInterval(timer)
        running = false
    }

    period--
}, 1000)

function setHead(spot)
{
    var x = spot.xpos
    var y = spot.ypos
    var rx = x; var ry = y;
    switch (spot.deriction) {
        case 'f':
            break;
        
        case 'r':
            x++;
            break;

        case 'l':
            x--;
            break;

        case 'u':
            y--;
            break;

        case 'd':
            y++;
            break;
    }

    if (x > 9 || x < 0 || y > 9 || y < 0) return
    spot.xpos = x
    spot.ypos = y
    grid[y][x].classList.add("addRed")
    if (spot.deriction != 'f') grid[ry][rx].classList.remove("addRed")
    if (grid[y][x].classList[1] == "addBlue") {
        setRandom()
        increaseScore()
    }
}


function setListeners()
{
    window.addEventListener("keydown", (e) => handleIn(e))
}


function fill()
{
    var v = 0
    for (let i = 0; i < 10; i++) {
        for (let x = 0; x < 10; x++) {
            grid[i][x] = elements[v]
            v++
        }
    }
}

function setRandom()
{
    if (!once) grid[randomy][randomx].classList.remove("addBlue")
    randomx = Math.floor(Math.random() * 10)
    randomy = Math.floor(Math.random() * 10)
    grid[randomy][randomx].classList.add("addBlue")
    once = false
}

function increaseScore() {
    playerScore++
    score.innerHTML = 'Score: ' + playerScore
}

function endGame() {
    window.removeEventListener("keydown")
}