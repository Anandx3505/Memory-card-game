export const WinCard = ({move}) =>{
    return (
        <div className="win-message">
        <h2> Congratulations ! </h2>
        <h3>You completed the game in {move}</h3>
        <p>Press Space to play again</p>
        </div>
    )
}