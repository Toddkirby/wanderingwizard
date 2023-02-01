import GameBoard, { gameTiles } from "./components/GameBoard";
import "./css/parent.css";
import "./css/player.css";
import React, { useState, useEffect } from "react";

function App() {
  //x,y position in association to the gameboard
  let [posX, setPosX] = useState(0);
  let [posY, setPosY] = useState(0);
  const [playerPosition, setPlayerPosition] = useState([0, 0]);
  //graphical position
  let [x, setX] = useState(0);
  let [y, setY] = useState(116);
  //to show when game is over
  const [gameOver, setGameOver] = useState(false);
  //tracking two variables to account for game
  const [hp, setHp] = useState(100);
  const [moves, setMoves] = useState(150);

  //mount the window.eventlistener for the key actions
  useEffect(() => {
    window.addEventListener("keydown", move, false);
  }, []);
  //need a checker for the hp and moves to set the gameover true
  useEffect(() => {
    if (hp <= 0 || moves <= 0) {
      setGameOver(true);
    }
  }, [hp, moves]);
  //function to check boundaries and hp/mv cost of the spots on the board
  function checkMove() {
    if (posX >= 0 && posX < 100 && posY >= 0 && posY < 100) {
      // let hpcost = gameTiles[posX][posY].healthcost;
      // setHp(hp - hpcost);
      // let mvcost = gameTiles[posX][posY].movecost;
      // setMoves(moves - mvcost);
    } else {
      console.log("player is out of bounds");
    }
    console.log(gameTiles[posX][posY]);
    console.log(hp);
  }

  //move function that takes in the event and changes the position of the player graphically as well as on the map array behind the scenes
  function move(e) {
    e.preventDefault();
    switch (e.keyCode) {
      //left
      case 37:
        setX((x -= 15.98));
        setPosX(posX--);
        setPlayerPosition(([x, y]) => [x - 1, y]);
        checkMove();
        setHp(prevHp => prevHp - gameTiles[posX][posY].healthcost);
        setMoves(prevMoves => prevMoves - gameTiles[posX][posY].movecost);
        
        break;
      //up
      case 38:
        setY((y -= 16.98));
        setPosY(posY--);
        setPlayerPosition(([x, y]) => [x, y - 1]);
        setHp(prevHp => prevHp - gameTiles[posX][posY].healthcost);
        setMoves(prevMoves => prevMoves - gameTiles[posX][posY].movecost);
        
        checkMove();
        break;
      //right
      case 39:
        setX((x += 15.98));
        setPosX(posX++);
        setPlayerPosition(([x, y]) => [x + 1, y]);
        setHp(prevHp => prevHp - gameTiles[posX][posY].healthcost);
        setMoves(prevMoves => prevMoves - gameTiles[posX][posY].movecost);
        
        checkMove();
        break;
      //down
      case 40:
        setY((y += 16.98));
        setPosY(posY++);
        setPlayerPosition(([x, y]) => [x, y + 1]);
        setHp(prevHp => prevHp - gameTiles[posX][posY].healthcost);
        setMoves(prevMoves => prevMoves - gameTiles[posX][posY].movecost);
        
        checkMove();
        break;
      default:
        console.log(e.keyCode);
    }
  }
  //Be sure to hit start when reloading the page to refresh the game....need to work out this bug
  const startGame = () => {
    setPlayerPosition([0, 0]);
    setPosX(0);
    setPosY(0);
    x = 0;
    y = 116;
    setGameOver(false);
  };

  return (
    <div className="parent">
      <span>
        <h1 className="title"> 🧙🏽‍♂️ Wandering Wizard 🧌</h1>
        <button onClick={startGame}>Start Game</button>
      </span>
      <div className="sticky">
        <p className="hp">{`HP: ${hp}`}</p>
        <p className="moves">{`Moves Left: ${moves}`}</p>
      </div>
      <div
        className="player"
        role="button"
        tabIndex="0"
        onKeyDown={(e) => move(e)}
        style={{
          position: "absolute",
          left: `${x}px`,
          top: `${y}px`,
        }}
      >
        <p className="wizard">🧙🏽‍♂️</p>
      </div>
      <GameBoard />
      {gameOver ? (
        <div className="gameover">GAME OVER!</div>
      ) : (
        <div className="goodluck">GOODLUCK!</div>
      )}
    </div>
  );
}

export default App;
