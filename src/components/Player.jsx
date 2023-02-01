import React, { useState } from "react";

//was initially going to be a component, but felt the project was a bit too small for this extra component. perhaps when v2 comes this file will shine.
const Player = () => {
  const [hp, setHp] = useState(100);
  const [move, setMove] = useState(150);
  return <div>player</div>;
};

export default Player;
