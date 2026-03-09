import Row from "@/features/BoardFeatures/Row.jsx"
import Button from "@/components/Button.jsx";
import { EventProviderContext } from "@/context/EventHandlerContext.js";
import StatusBar from "@/features/UI/StatusBar.jsx";

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
      <div className="w-screen h-screen flex justify-center items-start pt-10">
        {/* קונטיינר שמחזיק את כל המשחק באותו רוחב */}
        <div className="flex flex-col items-start gap-6">
          {/* כותרת */}
          <div className="inline-block">
            <h1 className="text-4xl font-bold text-gray-800">
              4 In a Line - The Game
            </h1>
            <div className="h-[1px] bg-gray-300 mt-1"></div>
          </div>

          {/* לוח המשחק */}
          <div className="flex flex-col gap-2">
            {gameLogic.board.rows.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </div>

          {/* כפתורים / מידע */}
          <div className="mt-2 flex gap-4">
            <Button handleClick={handleBackToMenuClick}> 🔙 Back </Button>
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
