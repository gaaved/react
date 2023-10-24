import { useState } from 'react';

function Square({ value, onSquareClick, color }) {
    return (
        <button className="square" onClick={onSquareClick} style={{backgroundColor: color}}>
            {value}
        </button>
    );
}

function Board({ xIsNext, squares, onPlay }) {
    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status;
    let setColor = [Array(9).fill('')]
    if (winner) {
        for (let i = 0; i <= winner.winnerNumbers.length; i++){
            setColor[winner.winnerNumbers[i]] = 'red'
        }

        status = 'Winner: ' + winner.winnerSymbol;
    } else {
        setColor.fill(['white']);
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }


    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)}    color={setColor[0]} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)}    color={setColor[1]}/>
                <Square value={squares[2]} onSquareClick={() => handleClick(2)}    color={setColor[2]}/>
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)}    color={setColor[3]}/>
                <Square value={squares[4]} onSquareClick={() => handleClick(4)}    color={setColor[4]}/>
                <Square value={squares[5]} onSquareClick={() => handleClick(5)}    color={setColor[5]}/>
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)}    color={setColor[6]}/>
                <Square value={squares[7]} onSquareClick={() => handleClick(7)}    color={setColor[7]}/>
                <Square value={squares[8]} onSquareClick={() => handleClick(8)}    color={setColor[8]}/>
            </div>
        </>
    );
}
//основной кусок который рендериться благодаря export default
export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>

        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {winnerSymbol: squares[a], winnerNumbers: [a, b, c]};
        }
    }
    if(!squares.includes(null)){
        return {winnerSymbol: 'Friends', winnerNumbers: Array(9).fill(0).map((_,i) => i )}
    }

    return null;
}