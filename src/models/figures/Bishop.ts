import {Figure, FigureNames} from "./Figure";
// @ts-ignore
import blackLogo from '../../assets/black-bishop.png'
// @ts-ignore
import whiteLogo from '../../assets/white-bishop.png'
import {Colors} from "../Colors";
import {Cell} from "../Cell";

export class Bishop extends Figure {

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.BISHOP;
    }

    canMove = (target: Cell): boolean => {
        if (!super.canMove(target)) {
            return false;
        }
        if (this.cell.isEmptyDiagonal(target)){
            return true;
        }
        return false;
    }
}
