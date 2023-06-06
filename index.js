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
        let cellNumber
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

    const updateDisplay = (cellnum, player, player2) => {
        if (gameBoardCells[cellnum] === "") {
            marks[cellnum].innerHTML = activePlayer
        }

        if (win) {
            resetGame()
            win = false
        }

        player.style.background = "white"
        player.style.color = "black"
        
        player2.style.background = "black"
        player2.style.color = "white"
        console.log(activePlayer)
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
                        win = true
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

const PlayerFactory = () => {
    let wins = 0

    return {wins}
}




const player1 = PlayerFactory()
const player2 = PlayerFactory()


