const cells = document.querySelectorAll("[data-cell]")
const marks = document.querySelectorAll("[data-mark]")
const gameBoard = document.getElementById("gameBoard")

gameBoardCells = [
    null, null, null, 
    null, null, null,  
    null, null, null]

const gameBoardState = (() => {
    let activePlayer = ""
    const setActivePlayer = (mark) => {
        activePlayer = mark 
    }
    const updateDisplay = () => {
        
    }
    const resetGame = () => {
        marks.forEach(marker => {
            marker.innerHTML = ""
        })
    }
    const startGame = () => {
        activePlayer = "X"
    }

    startGame()
    return {setActivePlayer, activePlayer}
})()


const PlayerFactory = () => {

}

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        cell.children[0].innerHTML = gameBoardState.activePlayer
    })
})


// const Player1 = PlayerFactory(X)
// const player2 = PlayerFactory()


