import React, {FC, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import CellComponent from "./CellComponent";
import {Cell} from "../models/Cell";
import {Player} from "../models/Player";

interface BoardCProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayers: () => void;
}

const BoardComponent: FC<BoardCProps> = ({board, setBoard, currentPlayer, swapPlayers}) => { // FC -> функциональный компонент
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    useEffect(() => {
        highlightCell();
    }, [selectedCell])

    const click = (cell: Cell) => {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            swapPlayers();
            setSelectedCell(null);

            updateBoard();
        } else {
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell);
            }
        }
    }

    const highlightCell = () => {
        board.highlightCells(selectedCell);
        updateBoard();
    }

    const updateBoard = () => {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    return (
        <div>
            <h3>Текущий игрок {currentPlayer?.color}</h3>
            <div className="board">
                {board.cells.map((row, index) =>
                    <React.Fragment key={index}>
                        {row.map(cell =>
                            <CellComponent
                                click={click}
                                cell={cell}
                                key={cell.id}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                            />
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

export default BoardComponent;
