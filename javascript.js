/* USER FACTORY */

function createPlayer (player) {
    const selectedPlayer = player;
    let wins = 0;
    let loses = 0;
    const getWinsRecord = () => wins;
    const addWin = () => wins++;
    const getLosesRecord = () => loses;
    const addLoss = () => loses++;
    
    

    return { addWin, selectedPlayer, getWinsRecord, addLoss, getLosesRecord}
}

const playerX = createPlayer("x");
const playerO = createPlayer("o")
let firstPlayer;
let secondPlayer;

const gameboardSection = document.getElementById('gameboardSection')
const formSection = document.getElementById('formSection')

const form = document.createElement('form');
formSection.appendChild(form)

const radioX = document.createElement('input');
radioX.setAttribute('name', 'player');
radioX.setAttribute('id', 'playerX');
radioX.setAttribute('type', 'radio');
const radioXLabel = document.createElement('label');
radioXLabel.setAttribute('for', 'playerX')
radioXLabel.innerText = "X"
form.appendChild(radioXLabel);
form.appendChild(radioX);

const radioO = document.createElement('input');
radioO.setAttribute('name', 'player');
radioO.setAttribute('id', 'playerO');
radioO.setAttribute('type', 'radio');
const radioOLabel = document.createElement('label');
radioOLabel.setAttribute('for', 'playerO')
radioOLabel.innerText = "O"
form.appendChild(radioOLabel);
form.appendChild(radioO);

const submit = document.createElement('input');
submit.setAttribute('type', 'submit');
submit.setAttribute('value', 'PLAY')
form.appendChild(submit);

form.onsubmit = (e) => {
    e.preventDefault()
    if (radioX.checked) {
        firstPlayer = playerX.selectedPlayer;
        secondPlayer = playerO.selectedPlayer;
        
    } else if (radioO.checked) {
        firstPlayer = playerO.selectedPlayer;
        secondPlayer = playerX.selectedPlayer;
    } else {
        alert("Pick a symbol!")
        return
    }
    
}

function createGameboard() {
    let turn = 1;
    let tilesArray = [1,2,3,4,5,6,7,8,9]
    
    const changeTurn = () => { turn++ }
    const getTurn = () => turn 
    const paintGb = () => {
        tilesArray.forEach( (el) => {
            const tile = document.createElement('div');
            tile.classList.add('tile')
            tile.innerText = el
            gameboardSection.appendChild(tile)
        })
    }


    return { changeTurn, paintGb, getTurn }
}
const gb = createGameboard()
gb.paintGb()
const tiles = document.querySelectorAll('.tile')
tiles.forEach( (tile) => {
    tile.addEventListener('click', () => {
        let turn = gb.getTurn()
        console.log(turn)
        if (turn% 2 === 0) {
            tile.innerText = `${firstPlayer}`;
            gb.changeTurn()
        } else {
            tile.innerText = `${secondPlayer}`;
            gb.changeTurn()
        }
        /* falta que con cada click chequee win/lose/tie conditions y que se auto deinhabilite el event listener del tile */
    }) 
})



