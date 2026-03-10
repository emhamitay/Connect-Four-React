import Row from "@/features/BoardFeatures/Row.jsx"
import Button from "@/components/Button.jsx";
import { EventProviderContext } from "@/context/EventHandlerContext.js";
import StatusBar from "@/features/UI/StatusBar.jsx";
import WinModal from "@/features/UI/WinModal.jsx";
import Status from "@/model/status.js";

export default function GameView({
  gameLogic,
  play,
  handleHover,
  handleUnHover,
  restart,
  currentlyHoveredColumn,
  handleBackToMenuClick
}) {

  //set events
  const eventProvider = {
    handleClick: (cell) => play(cell),
    handleHover: (cell) => handleHover(cell),
    handleUnHover: () => handleUnHover(),
    currentlyHoveredColumn: currentlyHoveredColumn,
    gameStatus: gameLogic.status
  };

  return (
    <EventProviderContext.Provider value={eventProvider}>
      {gameLogic.status === Status.FINISHED && gameLogic.winner && (
        <WinModal
          winner={gameLogic.winner}
          onRestart={restart}
          onBackToMenu={handleBackToMenuClick}
        />
      )}
      <div className="min-h-screen w-full px-4 py-8 sm:px-8">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 rounded-3xl border border-blue-200/80 bg-white/70 p-5 shadow-[0_28px_70px_rgba(31,74,153,0.2)] backdrop-blur sm:p-8">
          <div className="inline-block">
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
              Connect Four Arena
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              First to align four chips vertically, horizontally, or diagonally wins.
            </p>
            <div className="mt-3 h-[1px] bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
          </div>

          <div className="mx-auto w-fit max-w-full rounded-3xl border border-blue-300/60 bg-gradient-to-b from-blue-100/70 via-blue-200/60 to-blue-300/70 p-3 shadow-inner sm:p-4">
            <div className="flex w-fit flex-col gap-2 rounded-2xl border border-blue-400/35 bg-blue-950/35 p-2.5 sm:p-3">
            {gameLogic.board.rows.map((row) => (
              <Row key={row.id} row={row} />
            ))}
            </div>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-3">
            <Button handleClick={handleBackToMenuClick}>Back</Button>
            <Button handleClick={restart}> Restart </Button>
            <StatusBar
              currentPlayer={gameLogic.currentPlayer}
              status={gameLogic.status}
              winner={gameLogic.winner}
            ></StatusBar>
          </div>
        </div>
      </div>
    </EventProviderContext.Provider>
  );
}
