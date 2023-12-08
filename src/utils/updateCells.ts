import { AXES } from "../constants";
import { Axis, Cell } from "../types";
import { cloneDeep, isEqual } from "lodash";

export function createInitialCells(maxCoord: number): Cell[] {
  const cells = [];
  for (let x = -maxCoord; x <= maxCoord; x++) {
    const z1 = Math.max(-maxCoord, -x - maxCoord);
    const z2 = Math.min(maxCoord, -x + maxCoord);
    for (let z = z1; z <= z2; z++) {
      const y = -x - z;
      cells.push({ x, y, z, value: 0 });
    }
  }
  return cells;
}

export function shiftNumbers(maxCoord: number, cells: Cell[], mainAxis: Axis, reverse?: boolean): Cell[] {
  const updatedCells: Cell[] = cloneDeep(cells);

  for (let axis = -maxCoord; axis <= maxCoord; axis++) {
    const cellGroup = updatedCells.filter((cell) => cell[mainAxis] === axis);

    const nonEmptyCells = getNonEmptyCells(cellGroup);
    if (reverse) {
      nonEmptyCells.reverse();
    }

    const values = updateValues(nonEmptyCells);

    fillInCells(cellGroup, values, reverse);
  }
  return updatedCells;
}

function updateValues(cells: Cell[]): number[] {
  let isAdded = false;
  const values: number[] = [];
  for (let i = 0; i < cells.length; i++) {
    if (i === 0) {
      values.push(cells[i].value);
    } else {
      if (cells[i].value === cells[i - 1].value) {
        if (isAdded) {
          values.push(cells[i].value);
          isAdded = false;
        } else {
          values[values.length - 1] = cells[i].value + cells[i - 1].value;
          isAdded = true;
        }
      } else {
        values.push(cells[i].value);
        isAdded = false;
      }
    }
  }
  return values;
}

function fillInCells(cells: Cell[], values: number[], reverse?: boolean) {
  if (reverse) {
    for (let v = 0; v < values.length; v++) {
      cells[cells.length - 1 - v].value = values[v];
    }
    for (let c = 0; c < cells.length - values.length; c++) {
      cells[c].value = 0;
    }
  } else {
    for (let v = 0; v < values.length; v++) {
      cells[v].value = values[v];
    }
    for (let c = values.length; c < cells.length; c++) {
      cells[c].value = 0;
    }
  }
}

export function insertNewNumbers(allCells: Cell[], newCells: Cell[]) {
  const allCellsCopy = cloneDeep(allCells);
  newCells.forEach((newCell) => {
    const foundCell = allCellsCopy.find((cell) => newCell.x === cell.x && newCell.y === cell.y && newCell.z === cell.z);
    if (foundCell) {
      foundCell.value = newCell.value;
    }
  });
  return allCellsCopy;
}

export const getNonEmptyCells = (cells: Cell[]) => cells.filter((cell) => cell.value !== 0);

export function isGameOver(cells: Cell[], maxCoord: number) {
  for (let i = 0; i < AXES.length; i++) {
    if (!isEqual(cells, shiftNumbers(maxCoord, cells, AXES[i]))) {
      return false;
    }
  }
  for (let i = 0; i < AXES.length; i++) {
    if (!isEqual(cells, shiftNumbers(maxCoord, cells, AXES[i], true))) {
      return false;
    }
  }

  return true;
}
