import { useState } from "react";
import List from "@/components/List";
import env from "@/env";
import DivContainer from '@/components/DivContainer';
import Button from '@/components/Button';

export default function ChooseGame({ handleBackToMenuClick }) {
  const [playerName, setPlayerName] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chosenGame, setChosenGame] = useState(0);

  function chooseGame(id) {
    const game = items.find((item) => item._id === id);
    if (game) {
      setChosenGame(game);
      console.log("Chosen game:", game);
    } else {
      console.warn("Game not found with id:", id);
    }
  }

  async function fetchGames() {
    if (!playerName.trim()) {
      setError("Please enter a player name");
      setItems([]);
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        `${env.API_LIST_URL}?/player=${encodeURIComponent(playerName)}`
      );
      const data = await response.json();
      if (data.success) {
        setItems(data.games);
      } else {
        setError(data.message || "Error fetching games");
        setItems([]);
      }
    } catch (err) {
      setError("Network error");
      setItems([]);
    }
    setLoading(false);
  }

  return (
    <DivContainer>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Enter player name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="px-3 py-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchGames}
          className="ml-3 px-4 py-2 text-lg bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Get Games
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && items.length > 0 && (
        <List items={items} onChange={chooseGame} />
      )}
      {!loading && !error && items.length === 0 && <p>No games found.</p>}
      <Button handleClick={handleBackToMenuClick}> 🔙 Back </Button>
    </DivContainer>
  );
}
