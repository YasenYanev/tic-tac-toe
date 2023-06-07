const cells = document.querySelectorAll("[data-cell]")
const marks = document.querySelectorAll("[data-mark]")
const gameBoard = document.getElementById("gameBoard")
const plr1 = document.querySelector(".plr1")
const plr2 = document.querySelector(".plr2")

const gameBoardState = (() => {
    let gameBoardCells = ["", "", "", "", "", "",  "", "", ""]
    let win = false
    let activePlayer = "X"

    cells.forEach(cell => {
        cell.addEventListener("click", (e) => {
            cellNum = e.originalTarget.id
            if (activePlayer === "X") {
                gameBoardCells.splice(cellNum - 1, 1, "X")
                checkWinFor ("X")
                updateDisplay(cellNum - 1, plr2, plr1)
                activePlayer = "O"


            } else if (activePlayer === "O") {
                gameBoardCells.splice(cellNum - 1, 1, "O")
                checkWinFor("O")
                updateDisplay(cellNum - 1, plr1, plr2)
                activePlayer = "X"
            }
        })
    })

    const updateDisplay = (cellnum, plr, plr1) => {
        marks[cellnum].innerHTML = activePlayer

        if (win) {
            resetGame()
            win = false
        }

        plr.style.background = "white"
        plr.style.color = "black"
        
        plr1.style.background = "black"
        plr1.style.color = "white"

        document.querySelector(".plr1-score").innerHTML = player1.wins
        document.querySelector(".plr2-score").innerHTML = player2.wins
    }

    const checkWinFor = (winMark) => {
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
                if (getMarkIndex(winMark).includes(winCondition[c])) {
                    streakCounter += 1
                    if (streakCounter === 3) {
                        win = true
                        if (winMark === player1.idMark) {
                            player1.wins += 1
                        } else if (winMark === player2.idMark) {
                            player2.wins += 1
                        }
                    }
                }
                
            }
        }
    }

    const resetGame = () => {
        gameBoardCells = ["", "", "", "", "", "", "", "", ""]
        activePlayer = "X"
        marks.forEach(mark => {
            mark.innerHTML = ""
        })
    }

    return { }
})()

const PlayerFactory = (playerMark) => {
    let idMark = playerMark
    let wins = 0

    return {wins, idMark}
}




const player1 = PlayerFactory("X")
const player2 = PlayerFactory("O")


