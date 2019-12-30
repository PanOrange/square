import { Area } from './square';

describe("SQUARE", () => {
  let area: Area;
  beforeEach(() => {
    area = new Area();
  });

  describe("init method", () => {
    it("should create area", () => {
      expect(area).toBeTruthy();
    });

    it("should create area with size 3 by default", () => {
      expect(area.size).toBe(3);
    });
  });

  describe("leftAction method", () => {
    it("should do nothing if row is empty", () => {
      const emptyArray: number[] = [null, null, null];
      area.area = [emptyArray];
      area.leftAction();

      expect(area.area).toEqual([emptyArray]);
    });

    it("should move value to the left while left sibling is empty", () => {
      const row: number[] = [null, null, 2];
      const expectedRow: number[] = [2, null, null];
      area.area = [row];
      area.leftAction();

      expect(area.area).toEqual([expectedRow]);
    });

    it("should double values if siblings are equal and only left sibling remain", () => {
      const row: number[] = [null, 2, 2];
      const expectedRow: number[] = [4, null, null];
      area.area = [row];
      area.leftAction();

      expect(area.area).toEqual([expectedRow]);
    });
  });

});
