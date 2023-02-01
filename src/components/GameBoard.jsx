import React, { useEffect } from "react";
import "../css/gameboard.css";

const gameTiles = [];
const GameBoard = () => {
  //100x100 grid that is populated with random tiles and values pulled from the array

  function generateGame() {
    const tileArray = [
      { id: 1, type: " ", healthcost: 0, movecost: 1 },
      { id: 2, type: "💨", healthcost: 5, movecost: 0 },
      { id: 3, type: "🔥", healthcost: 50, movecost: 10 },
      { id: 4, type: "🧱", healthcost: 10, movecost: 5 },
      { id: 5, type: "🟢", healthcost: 0, movecost: 0 },
      { id: 6, type: "🛑", healthcost: 0, movecost: 1 },
    ];
    //fun way to randomly generate a 2d grid of these tiles objects
    for (var row = 0; row < 100; row++) {
      gameTiles[row] = [];
      for (var col = 0; col < 100; col++) {
        let rng = Math.floor(Math.random() * 4 + 1);
        if (rng === 1) gameTiles[row][col] = gameTiles[row][col] = tileArray[0];
        if (rng === 2) gameTiles[row][col] = gameTiles[row][col] = tileArray[1];
        if (rng === 3) gameTiles[row][col] = gameTiles[row][col] = tileArray[2];
        if (rng === 4) gameTiles[row][col] = tileArray[3];
        gameTiles[0][0] = tileArray[4];
        gameTiles[0][99] = tileArray[5];
      }
    }
  }
  //need the function to trigger once on load
  useEffect(() => {
    generateGame();
  }, []);

  //console.log(startPoint);
  return (
    <div className="grid">
      {gameTiles.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((col, colIndex) => (
            <div key={colIndex} className="tile">
              {col.type}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export { gameTiles };
export default GameBoard;
