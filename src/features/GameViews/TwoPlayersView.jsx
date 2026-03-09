import { TwoPlayersController } from '@/contollers/TwoPlayersController.js';
import GameView from "./GameView.jsx";
import { useSnapshot } from "valtio";
import { useRef } from 'react';

export default function TwoPlayersView({ state, handleBackToMenuClick ,history}) {
  
  // Initialize the game logic based on the game mode
  const [ play, handleHover, handleUnHover, restart] =
    TwoPlayersController(state, history);

  const snapshot = useSnapshot(state);
  return (
    <GameView
      gameLogic={snapshot.gameLogic}
      play={play}
      handleHover={handleHover}
      handleUnHover={handleUnHover}
      restart={restart}
      currentlyHoveredColumn={snapshot.currentlyHoveredColumn}
      handleBackToMenuClick={handleBackToMenuClick}
    />
  );
}

//📜
