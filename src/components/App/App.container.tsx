import { isEqual } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { DEFAULT_PORT, HOST_PARAM, KEYS, PORT_PARAM, RADIUS_PARAM, keyToAxis } from "../../constants";
import { useKeyListener as useKeyHandler } from "../../hooks/useKeyListener";
import { retrieveCells } from "../../services/rngService";
import { Cell, InitParams, KeyToAxis } from "../../types";
import { createInitialCells, getNonEmptyCells, insertNewNumbers, isGameOver, shiftNumbers } from "../../utils/updateCells";
import View from "./App.view";

export const App = () => {
  const [cells, setCells] = useState<Cell[]>();
  const [initParams, setInitParams] = useState<InitParams>();

  useKeyHandler(useCallback(onKeyDown, [cells, initParams]));

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const hostname = searchParams.get(HOST_PARAM);
    const radius = searchParams.get(RADIUS_PARAM);
    if (!hostname || !radius) {
      throw new Error("Hostname or radius is not defined");
    }

    const port = searchParams.get(PORT_PARAM) ?? DEFAULT_PORT;

    const params = {
      hostname,
      port,
      radius,
    };
    setInitParams(params);

    const initialCells = createInitialCells(parseInt(radius) - 1);
    (async function () {
      const newCells = await retrieveCells([], params);
      const updatedCells = insertNewNumbers(initialCells, newCells);
      setCells(updatedCells);
    })();
  }, []);

  if (!initParams || !cells) {
    return null;
  }

  async function onKeyDown(e: KeyboardEvent) {
    const key = e.key;
    if (!KEYS.includes(key) || !cells || !initParams) {
      return;
    }

    let updatedCells: Cell[];

    updatedCells = shiftNumbers(
      parseInt(initParams.radius) - 1,
      cells,
      keyToAxis[key as keyof KeyToAxis].axis,
      keyToAxis[key as keyof KeyToAxis].reverse
    );

    if (!isEqual(cells, updatedCells)) {
      const nonEmptyCells = getNonEmptyCells(updatedCells);
      const newCells = await retrieveCells(nonEmptyCells, initParams);

      updatedCells = insertNewNumbers(updatedCells, newCells);
      setCells(updatedCells);
    }
  }

  const gameOver = isGameOver(cells, parseInt(initParams.radius) - 1);

  return <View cells={cells} gameOver={gameOver} />;
};
