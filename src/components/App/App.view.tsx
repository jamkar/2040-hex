import { HexGrid, Hexagon, Layout, Text } from "react-hexgrid";
import { Cell } from "../../types";
import Styles from "./App.module.scss";

const AppView = ({ cells, gameOver }: { cells: Cell[]; gameOver: boolean }) => {
  const gameStatus = gameOver ? "game-over" : "playing";

  return (
    <div className={Styles.field}>
      <div className={Styles.hexGrid}>
        <HexGrid>
          <Layout>
            {cells.map((cell) => {
              const key = `${cell.x}${cell.y}${cell.z}`;
              return (
                <Hexagon key={key} q={cell.x} r={cell.z} s={cell.y}>
                  <Text className={Styles.value} data-x={cell.x} data-y={cell.y} data-z={cell.z} data-value={cell.value}>
                    {cell.value !== 0 && cell.value}
                  </Text>
                </Hexagon>
              );
            })}
          </Layout>
        </HexGrid>
      </div>
      <div>
        Game Status: <span data-status={gameStatus}>{gameStatus}</span>
      </div>
    </div>
  );
};

export default AppView;
