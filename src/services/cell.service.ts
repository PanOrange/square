export const createArray = <T>(size: number = 1, value: T = null): T[] => {
  const arr = [];
  for (let j = 1; j <= size; j++) {
    arr.push(value instanceof Array ? value.slice() : value) ;
  }
  return (arr as Array<any>).slice();
};

export const createMatrix = <T>(size: number = 1, value?: T): T[][] => {
  const row = createArray(size, value);
  return createArray(size, row);
};

export const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max));
};
