/* GAMEBOARD */ 
const body = document.getElementById("body");
const gbContainer = document.createElement("div")
gbContainer.classList.add('gameboard')
body.appendChild(gbContainer)

const gb = (function gameboard() {
    
    const gameboard = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
    const displayGameboard = () => {
        gameboard.forEach(element => {
            const index = gameboard.indexOf(element)
            const tile = document.createElement("div");
            tile.innerText = `${index}`
            tile.classList.add(`${element}`);
            tile.classList.add("tile")
            gbContainer.appendChild(tile);
        });
   
    }
    return { displayGameboard }
    
})()

gb.displayGameboard()

function createPlayer(order) {
    if (order === "first") {
        const player = "X"
    } else {
        const player = "O"
    }

    return { user }
}







