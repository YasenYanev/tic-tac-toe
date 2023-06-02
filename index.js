const cells = document.querySelectorAll("[data-cell]")
const marks = document.querySelectorAll("[data-mark]")
const gameBoard = document.getElementById("gameBoard")


const gameBoardState = (() => {
    let gameBoardCells = [
        "cell1", "cell2", "cell3", 
        "cell4", "cell5", "cell6",  
        "cell7", "cell8", "cell9"]

    let activePlayer = "X"

    cells.forEach(cell => {
        let cellNumber
        cell.addEventListener("click", (e) => {
            cellNumber = e.originalTarget.id
            cellNumToArrayNum = cellNumber - 1
            if (gameBoardCells.indexOf("X") && gameBoardCells.indexOf("O") === cellNumToArrayNum) {
                return
            }

            if (activePlayer === "X") {
                cell.children[0].innerHTML = activePlayer
                gameBoardCells.splice(cellNumToArrayNum, 1, "X")
                updateActivePlrDisplay(".plr2", ".plr1")
                activePlayer = "O"

            } else if (activePlayer === "O") {
                cell.children[0].innerHTML = activePlayer
                gameBoardCells.splice(cellNumToArrayNum, 1, "O")
                updateActivePlrDisplay(".plr1", ".plr2")
                activePlayer = "X"

            }
        })
    })

    const updateActivePlrDisplay = (player, player2) => {
        document.querySelector(player).style.background = "white"
        document.querySelector(player).style.color = "black"

        document.querySelector(player2).style.background = "black"
        document.querySelector(player2).style.color = "white"
    }
    const resetGame = () => {
        marks.forEach(marker => {
            marker.innerHTML = ""
        })
    }
    return { }
})()

const PlayerFactory = (name) => {
    let wins = undefined

    return {name}
}




const player1 = PlayerFactory("X")
const player2 = PlayerFactory("O")


