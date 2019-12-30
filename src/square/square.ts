const getRandom = (maxValue: number): number => {
  return Math.random();
};

const FIRST = 0;

export class Area {
  area: Array<any[]>;
  size: number;
  constructor(size: number = 3){
    this.size = size;
  }
  init() {
    const area = [];

    for (let i = 1; i <= this.size; i++) {
      const row = [];
      for (let j = 1; j <= this.size; j++) {
        row.push(null);
      }
      area.push(row);
    }
    this.area = area;

    //TODO randomize
    this.area[0][0] = 4;
    this.area[0][1] = 2;
    this.area[0][2] = 2;
    this.area[1][0] = 4;
    this.area[1][2] = 2;
    this.area[2][0] = 8;
    this.area[2][2] = 8;
    console.log('INIT ', this.area);
  }

  leftAction() {
    let cellValue: number;
    this.area.map((row, index, area) => {
      for (let i = FIRST; i < row.length; i++) {
        cellValue = row[i];

        if (cellValue) {
          // move Left
          for (let j = i; j > FIRST; j--) {
            if (row[j - 1] === null) {
              row[j - 1] = cellValue;
              row[j] = null;
            } else if (row[j - 1] === cellValue) {
              row[j - 1] = cellValue * 2;
              row[j] = null;
              j = FIRST;
            } else {
              j = FIRST;
            }
          }
        }
      }

      return row;
    });

    console.log('MOVE LEFT ', this.area);
  }
}
