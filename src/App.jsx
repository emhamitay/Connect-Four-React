// App.js
import { ScreenManager, Screen } from "@/components/ScreenManager.jsx";
import Button from "@/components/Button";
import RadioOption from "@/components/RadioOption.jsx";
import RadioGroup from "@/components/RadioGroup.jsx";
import { useState, useRef } from "react";
import TwoPlayersView from "@/features/GameViews/TwoPlayersView.jsx";
import { Game_Mode, Screens } from "@/ui-js/statics.js";
import * as ProxyCreator from "@/contollers/ProxyCreator";
import OnePlayerView from "./features/GameViews/OnePlayerView";
import DivContainer from "@/components/DivContainer";


export default function App() {
  const [gameMode, chooseGameMode] = useState(Game_Mode.TWO_PLAYERS);
  const [currentScreen, setCurrentScreen] = useState(Screens.Home);
  const history = useRef([]); //setting history in root (and not in the games controllers) so you could send the history from a screen to another

  const handleBackToMenuClick = () => {
    setCurrentScreen(Screens.Home);
  };
  

  return (
    <ScreenManager currentScreen={currentScreen}>
      <Screen screenName={Screens.Home}>
        <DivContainer title="4 in a row - the game">
          <h2>Options: </h2>
          <span className="hr"></span>
          <RadioGroup
            legend="Game Mode"
            value={gameMode}
            onChange={(e) => {
              chooseGameMode(e.target.id);
            }}
          >
            <RadioOption
              id={Game_Mode.TWO_PLAYERS}
              value={"⚔️ Player vs Player"}
            />
            <RadioOption
              id={Game_Mode.ONE_PLAYER}
              value={"🤖 Player vs Computer"}
            />
            {/*
                                TODO: Maybe would add later
                                <RadioOption id={Game_Mode.MULTI_PLAYER} value={"🌐 Multi-Player Mode"} />
                                */}
          </RadioGroup>
          <footer className="mt-5">
            <Button handleClick={() => {
              console.log(gameMode);
              setCurrentScreen(gameMode)}
            }>
              ▶️ Start Game
            </Button>
          </footer>
        </DivContainer>
      </Screen>
      <Screen screenName={Game_Mode.TWO_PLAYERS}>
        <TwoPlayersView
          state={ProxyCreator.CreateNewTwoPlayersProxy()}
          history={history}
          handleBackToMenuClick={handleBackToMenuClick}
        />
      </Screen>
      <Screen screenName={Game_Mode.ONE_PLAYER}>
        <OnePlayerView
          state={ProxyCreator.CreateNewOnePlayerProxy()}
          history={history}
          handleBackToMenuClick={handleBackToMenuClick}
        />
      </Screen>

      {/* TODO: ADD THIS TO MULTIPLAYER MODE
        <Screen screenName={Game_Mode.MULTI_PLAYER}>
          TODO ADD HERE MULTY PLAYER VIEW
        </Screen>
        */}
    </ScreenManager>
  );
}
