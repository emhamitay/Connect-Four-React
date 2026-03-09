import { OnePlayerController } from '@/contollers/OnePlayerController.js';
import GameView from "./GameView.jsx";
import { useSnapshot } from "valtio";

export default function OnePlayerView({ state, handleBackToMenuClick , history}) {

  // Initialize the game logic based on the game mode
  const [ play, handleHover, handleUnHover, restart] =
    OnePlayerController(state, history);

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
