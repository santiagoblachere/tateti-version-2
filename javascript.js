/* USER FACTORY */
let ties = 0
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
const statSection = document.getElementById('statsContainer');
const stats = document.createElement('div'); 
statSection.appendChild(stats)

const form = document.createElement('form');
formSection.appendChild(form)
const legend = document.createElement('legend');
legend.innerText = "WHO STARTS?";
form.appendChild(legend)
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
    console.log(radioO.checked)
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
    function tileClickHandler() {
        
        if (firstPlayer === undefined) {
            return
        }
        let turn = gb.getTurn()
        tieCondition(tiles)
        if (turn% 2 === 0) {
            this.innerText = `${firstPlayer}`;
            
            
        } else {
            this.innerText = `${secondPlayer}`;
            
        }
        
        this.removeEventListener('click', tileClickHandler)
        gb.changeTurn();
        checkConditions(tiles)  
        
    }
    const changeTurn = () => { turn++ }
    const getTurn = () => turn 
    const displayStats = (() => {
        let winsX = playerX.getWinsRecord();
        let winsO = playerO.getWinsRecord();
        
        stats.innerText = `
                            X WINS = ${winsX};
                            O WINS = ${winsO};
                            TIES = ${ties}
        
        `
        

    })()
    const updateStats = () => {
        let winsX = playerX.getWinsRecord();
        let winsO = playerO.getWinsRecord();    
        stats.innerText = `
                            X WINS = ${winsX};
                            O WINS = ${winsO};
                            TIES = ${ties}
        
        `
    }
    const tieCondition = (array) => {
        let counterTiles = 0;
        
        for (let i = 0; i < array.length; i++) {
            if (array[i].innerText.trim() !== "") {
                 counterTiles++
                 
        }
        if (counterTiles === 9) {
            return true
        }
    }
    }   
    const paintGb = () => {
        
        tilesArray.forEach( (el) => {
            const tile = document.createElement('div');
            tile.classList.add('tile')
            tile.innerText = ""
            gameboardSection.appendChild(tile)
            
            tile.addEventListener('click', tileClickHandler)
        })
    }
    const resetGb = (tiles) => {
        firstPlayer = undefined;
        secondPlayer = undefined;
        turn = 0;
        tiles.forEach( (tile) => {
            console.log(tile)
            tile.innerText = ""
            tile.removeEventListener('click', tileClickHandler)
            tile.addEventListener('click', tileClickHandler)
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
            
            alert("X WINS!")
            
            
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
            
            alert("O WINS!")
            
            
        }
        else if ( tieCondition(tiles) === true) {
            ties++
            
            
            alert("ITS A TIE!")
            
        } else {
            return
        }
        resetGb(tiles);
        updateStats()

    } 


    return { changeTurn, paintGb, getTurn, tilesArray, checkConditions }
}

const gb = createGameboard()
gb.paintGb()
const tiles = document.querySelectorAll('.tile')

