import { useState } from "react";
import DivContainer from "@/components/DivContainer";
import Input from "@/components/Input";
import Button from "@/components/Button";
import env from '@/env.js'

export default function SaveGame({ history }) {
  const [playerName, setPlayerName] = useState("");
  const [gameName, setGameName] = useState("");

  const [touched, setTouched] = useState({
    player: false,
    game: false,
  });

  const isPlayerInvalid = touched.player && playerName.trim() === "";
  const isGameInvalid = touched.game && gameName.trim() === "";

  const handleSave = async () => {
    setTouched({ player: true, game: true });

    if (playerName.trim() === "" || gameName.trim() === "") {
      return;
    }

    const payload = {
      player: playerName.trim(),
      game: gameName.trim(),
      history: history.current,
    };

    try {
      const res = await fetch(env.API_SAVE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      console.log("Game saved:", data);
      alert("Game saved successfully!");
      // TODO: reset form, show success toast, etc.
    } catch (err) {
      console.error("Error saving game:", err);
      alert("Error saving game. Please try again.");
    }
  };

  return (
    <DivContainer title="Save the game">
      <div className="flex flex-col gap-5">
        <Input
          type="text"
          id="pname"
          text="Player's Name:"
          isMust={true}
          value={playerName}
          onChange={(e) => {
            setPlayerName(e.target.value);
            setTouched((prev) => ({ ...prev, player: true }));
          }}
          isError={isPlayerInvalid}
          isTouched={touched.player}
          errorMessage="Please enter the player's name"
        />

        <Input
          type="text"
          id="gname"
          text="Game Name:"
          isMust={true}
          value={gameName}
          onChange={(e) => {
            setGameName(e.target.value);
            setTouched((prev) => ({ ...prev, game: true }));
          }}
          isError={isGameInvalid}
          isTouched={touched.game}
          errorMessage="Please enter the game name"
        />

        <p className="text-sm text-gray-600 dark:text-gray-400">
          The game will be saved and can be loaded again using the player's
          name.
        </p>

        <Button handleClick={handleSave}>Save</Button>
      </div>
    </DivContainer>
  );
}
