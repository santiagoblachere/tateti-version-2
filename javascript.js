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
        firstPlayer = playerX;
        
    } else if (radioO.checked) {
        firstPlayer = playerO;
    } else {
        alert("Pick a symbol!")
        return
    }
    
}




