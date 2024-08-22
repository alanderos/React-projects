import { Children, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { TURNS,WINNER_COMBOS } from './constants'
import { checkWinnerFrom, checkEndGame } from './logic/board'
import {WinnerModal} from './components/WinnerModal'
import { saveGameStoraje, resetGameStoraje } from './logic/storage'
function App() {
  console.log('render')
  //const [board, setBoard] = useState(Array(9).fill(null)) //useState(['x','x','x','o','o','o','x','o','x'])
  const [board, setBoard] = useState(()=>{
    console.log('inicializar estado del board')
    const boardFromStorage = window.localStorage.getItem('board')
    if(boardFromStorage) return JSON.parse(boardFromStorage)
      return Array(9).fill(null)
  })
  // const [turn, setTurn] = useState(TURNS.X)
  const [turn, setTurn] = useState(()=>{
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })


  const [winner, setWinner] = useState(null) //null no hay ganador, false es un empate


  const resetGame = () =>{
    //function resetGame(){
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStoraje()
  }

  

  const updateBoard = (index) => {
    //no actualizar posición si hay algo
    if(board[index] || winner) return //si ya hay algo, sale sin hacer nada
    //actualizar tablero
    const newBoard = [ ... board]
    newBoard[index] = turn
    setBoard(newBoard) //actualización asincrona
    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //guardar la partida
    saveGameStoraje({board:newBoard, turn:newTurn})
    //revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
      console.log("winner: ", newWinner)
    } else if (checkEndGame(newBoard)){
      setWinner(false)
    }
    
  }

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del Juego</button>
      <section className='game'>
        {
          board.map((_,index)=>{
            return(
              <Square 
                key={index} 
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected = {turn===TURNS.X}>{TURNS.X}</Square>
        <Square isSelected = {turn===TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
