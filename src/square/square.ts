import { isEqual, isEqualWith } from 'lodash';

const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max));
};

export class Area {
  area: Array<any[]>;
  size: number;
  constructor(size: number = 3){
    this.size = size;
  }
  public init(): void {

    this.area = this.createMatrix(this.size);

    //TODO randomize
    // this.area[0][0] = 2;
    // this.area[0][1] = 2;
    // this.area[0][2] = 4;
    // this.area[1][0] = 2;
    // this.area[1][1] = 2;
    // this.area[1][2] = 4;
    // this.area[2][0] = 8;
    // this.area[2][2] = 8;
    this.addRandomCell();
    this.addRandomCell();
    console.log('INIT ', this.area.slice());
  }

  public leftAction(): void {
    const matrix = this.area.map((row) => this.moveToStart(row.slice()));

    // if (!isEqual(matrix, this.area)) {
    //   this.addRandomCell();
    // }

    const customizer = (result, source) => {
      const areEqual: boolean = true;

      const q = result.values();
      const notEqual = q.some((row, index) => !isEqual(row, source[index]));
    };

    console.log('MOVE LEFT ', !isEqualWith(matrix, this.area, customizer), this.area, matrix);
  }

  public rightAction(): void {
    this.area.map((row) => this.moveToStart(row.reverse()).reverse());
    this.addRandomCell();

    console.log('MOVE RIGHT ', this.area);
  }

  public downAction(): void {
    const matrix = this.createMatrix(this.size);

    for (let i = 0; i < this.area.length; i++) {
      const column = this.moveToStart(this.area.map(item => item[i]).reverse()).reverse();

      column.forEach((item, index) => matrix[index][i] = column[index]);
    }

    this.area = matrix;
    this.addRandomCell();

    console.log('MOVE DOWN ', this.area);
  }

  public upAction(): void {
    const matrix = this.createMatrix(this.size);

    for (let i = 0; i < this.area.length; i++) {
      const column = this.moveToStart(this.area.map(item => item[i]));

      column.forEach((item, index) => matrix[index][i] = column[index]);
    }

    this.area = matrix;
    this.addRandomCell();

    console.log('MOVE UP ', this.area);
  }

  private moveToStart(row: number[]): number[] {
    const FIRST = 0;
    let cellValue: number;
    let preventDouble: number = null;

    for (let i = FIRST; i < row.length; i++) {
      cellValue = row[i];

      if (cellValue) {
        for (let j = i; j > FIRST; j--) {
          if (row[j - 1] === null) {
            row[j - 1] = cellValue;
            row[j] = null;
          } else if (row[j - 1] === cellValue && preventDouble !== j - 1) {
            row[j - 1] = cellValue * 2;
            row[j] = null;
            preventDouble = j - 1;
            j = FIRST;
          } else {
            j = FIRST;
          }
        }
      }
    }

    return row;
  }

  private createMatrix(size: number): any[] {
    const matrix = [];

    for (let i = 1; i <= size; i++) {
      const row = [];
      for (let j = 1; j <= size; j++) {
        row.push(null);
      }
      matrix.push(row);
    }

    return matrix;
  }

  private addRandomCell() {
    // refactor to abstract
    let rowSourceIndexes = [0, 1, 2];

    const setRandomCell = () => {
      if (!rowSourceIndexes.length) {
        // supposed end of game
        return;
      }

      const randomIndex = getRandomInt(rowSourceIndexes.length);

      const randomRow = rowSourceIndexes[randomIndex];
      rowSourceIndexes.splice(randomIndex, 1);

      const cellSourceIndexes = this.area[randomRow].map((item, index) => !item ? index : null ).filter(item => item !== null);
      if (cellSourceIndexes.length) {
        this.area[randomRow][cellSourceIndexes[getRandomInt(cellSourceIndexes.length)]] = 2;
        return;
      } else {
        // if no cells get to next row

        setRandomCell();
      }
    };

    setRandomCell();
  }
}
