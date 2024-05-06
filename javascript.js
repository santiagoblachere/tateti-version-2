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
NodeList.prototype.indexOf = Array.prototype.indexOf;

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
    console.log(radioX.checked)
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
    let turn = 0;
    let tilesArray = [1,2,3,4,5,6,7,8,9]
    
    const changeTurn = () => { turn++ }
    const getTurn = () => turn 
    const paintGb = () => {
        tilesArray.forEach( (el) => {
            const tile = document.createElement('div');
            tile.classList.add('tile')
            tile.innerText = el
            gameboardSection.appendChild(tile)
            tile.addEventListener('click', () => {
                let turn = gb.getTurn()
                
                if (turn% 2 === 0) {
                    tile.innerText = `${firstPlayer}`;
                    
                    gb.changeTurn()
                } else {
                    tile.innerText = `${secondPlayer}`;
                    gb.changeTurn()
                }
                checkConditions(tiles)
                /* falta que con cada click chequee win/lose/tie conditions y que se auto deinhabilite el event listener del tile */
            })
        })
    }
    const resetGb = (tiles) => {
        tiles.forEach( (tile) => {
            tile.innerText = ""
        })
    }
    const checkConditions = (tiles) => {
        if ( (tiles[0].innerText === "x" && tiles[1].innerText === "x" && tiles[2].innerText === "x" ) ||
             (tiles[3].innerText === "x" && tiles[4].innerText === "x" && tiles[5].innerText === "x") || 
             (tiles[6].innerText === "x" && tiles[7].innerText === "x" && tiles[8].innerText === "x") || 
             (tiles[0].innerText === "x" && tiles[3].innerText === "x" && tiles[6].innerText === "x") || 
             (tiles[1].innerText === "x" && tiles[4].innerText === "x" && tiles[7].innerText === "x") || 
             (tiles[2].innerText === "x" && tiles[5].innerText === "x" && tiles[8].innerText === "x") || 
             (tiles[0].innerText === "x" && tiles[4].innerText === "x" && tiles[8].innerText === "x") || 
             (tiles[2].innerText === "x" && tiles[3].innerText === "x" && tiles[5].innerText === "x")
        )
        {
            playerX.addWin()
            playerO.addLoss()
            resetGb(tiles);
            console.log(playerX.getWinsRecord())
            console.log(playerO.getLosesRecord())
        }
        else if ( (tiles[0].innerText === "o" && tiles[1].innerText === "o" && tiles[2].innerText === "o") ||
        (tiles[3].innerText === "o" && tiles[4].innerText === "o" && tiles[5].innerText === "o") || 
        (tiles[6].innerText === "o" && tiles[7].innerText === "o" && tiles[8].innerText === "o") || 
        (tiles[0].innerText === "o" && tiles[3].innerText === "o" && tiles[6].innerText === "o") || 
        (tiles[1].innerText === "o" && tiles[4].innerText === "o" && tiles[7].innerText === "o") || 
        (tiles[2].innerText === "o" && tiles[5].innerText === "o" && tiles[8].innerText === "o") || 
        (tiles[0].innerText === "o" && tiles[4].innerText === "o" && tiles[8].innerText === "o") || 
        (tiles[2].innerText === "o" && tiles[3].innerText === "o" && tiles[5].innerText === "o")
        
   ){
            playerO.addWin()
            playerX.addLoss()
            resetGb(tiles);
            console.log(playerO.getWinsRecord())
            console.log(playerX.getLosesRecord())
        }

    }


    return { changeTurn, paintGb, getTurn, tilesArray, checkConditions }
}
const gb = createGameboard()
gb.paintGb()
const tiles = document.querySelectorAll('.tile')







