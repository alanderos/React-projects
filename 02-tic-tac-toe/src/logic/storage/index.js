export const saveGameStoraje = ({board, turn}) => {
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', turn)
}

export const resetGameStoraje = () => {
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
}