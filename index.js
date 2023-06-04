const cells = document.querySelectorAll("[data-cell]")
const marks = document.querySelectorAll("[data-mark]")
const gameBoard = document.getElementById("gameBoard")

const gameBoardState = (() => {
    let gameBoardCells = ["", "", "", "", "", "",  "", "", ""]

    let activePlayer = "X"

    cells.forEach(cell => {
        let cellNumber
        cell.addEventListener("click", (e) => {
            cellNumber = e.originalTarget.id
            if (activePlayer === "X") {
                // cell.children[0].innerHTML = activePlayer
                gameBoardCells.splice(cellNumber - 1, 1, "X")
                checkWinFor ("X")
                updateDisplay(cellNumber)
                updateActivePlrDisplay(".plr2", ".plr1")
                console.log(gameBoardCells)
                activePlayer = "O"

            } else if (activePlayer === "O") {
                // cell.children[0].innerHTML = activePlayer
                gameBoardCells.splice(cellNumber - 1, 1, "O")
                checkWinFor("O")
                updateDisplay(cellNumber)
                updateActivePlrDisplay(".plr1", ".plr2")
                console.log(gameBoardCells)
                activePlayer = "X"
            }
        })
    })

    const updateDisplay = (cellnum) => {
        for (let r = 0; r < gameBoardCells.length; r++) {
            if (gameBoardCells[r] === "" || (r === cellnum - 1) ) {
                marks[r].innerHTML = activePlayer
                return
            }
        }
    }

    const updateActivePlrDisplay = (player, player2) => {
        document.querySelector(player).style.background = "white"
        document.querySelector(player).style.color = "black"

        document.querySelector(player2).style.background = "black"
        document.querySelector(player2).style.color = "white"
    }
    const checkWinFor = (mark) => {
        const winScenarios = [
            [0, 1, 2], 
            [3, 4, 5], 
            [6, 7, 8], 
            [0, 3, 6], 
            [1, 4, 7], 
            [2, 5, 8],
            [0, 4, 8], 
            [2, 4, 6]
        ]
        const getMarkIndex = (marker) => {
            let indexes = []
            for (let i = 0; i < gameBoardCells.length; i++) {
                if (gameBoardCells[i] === marker) {
                    indexes.push(i)
                }
            }
            return indexes
        }

        for(let i = 0; i < winScenarios.length; i++) {
            let streakCounter = 0
            let winCondition = winScenarios[i]
            for (let c = 0; c < winCondition.length; c++) {
                if (getMarkIndex(mark).includes(winCondition[c])) {
                    streakCounter += 1
                    if (streakCounter === 3) {
                        console.log("win")
                        // resetGame()
                    }
                }
            }
        }
    }

    const resetGame = () => {
        gameBoardCells = ["", "", "", "", "", "",  "", "", ""]
        activePlayer = "X"
    }

    return { }
})()

const PlayerFactory = (name) => {
    let wins = undefined

    return {name}
}




const player1 = PlayerFactory("X")
const player2 = PlayerFactory("O")


