const cells = document.querySelectorAll("[data-cell]")
const marks = document.querySelectorAll("[data-mark]")
const gameBoard = document.getElementById("gameBoard")
const plr1 = document.querySelector(".plr1")
const plr1Score = document.querySelector(".plr1-score")
const plr2Score = document.querySelector(".plr2-score")
const plr2 = document.querySelector(".plr2")
const winMsg = document.getElementById("win-message")
const winMsgTxt = document.getElementById("win-message-text")
const continueBtn = document.getElementById("continue-btn")
const restartBtn = document.getElementById("restart-btn")
 


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
                updateDisplay(cellNum - 1)
                if (win) {
                    activePlayer = "X"
                } else (
                    activePlayer = "O"
                )
            } else if (activePlayer === "O") {
                gameBoardCells.splice(cellNum - 1, 1, "O")
                checkWinFor("O")
                updateDisplay(cellNum - 1)
                activePlayer = "X"
            }
        })
    })

    const updateDisplay = (cellnum) => {
        marks[cellnum].innerHTML = activePlayer

        if (win) {
            winMsgTxt.innerHTML = `Player ${activePlayer} has won!`
            winMsg.style.display = "inherit"
            continueBtn.addEventListener("click", () => {
                resetGame()
                winMsg.style.display = "none"
                plr1Score.innerHTML = player1.wins
                plr2Score.innerHTML = player2.wins
                win = false
                return
            })
            restartBtn.addEventListener("click", () => {
                location.reload()
            })
        }
        if (activePlayer === "X") {
            plr1.style.background = "white"
            plr1.style.color = "black"
            
            plr2.style.background = "black"
            plr2.style.color = "white"
        } else if (activePlayer === "O") {
            plr2.style.background = "white"
            plr2.style.color = "black"
            
            plr1.style.background = "black"
            plr1.style.color = "white"
        }
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
                        activePlayer = "X"
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
        marks.forEach(mark => {
            mark.innerHTML = ""
        })
    }
})()

const PlayerFactory = (playerMark) => {
    let idMark = playerMark
    let wins = 0

    return {wins, idMark}
}




const player1 = PlayerFactory("X")
const player2 = PlayerFactory("O")


