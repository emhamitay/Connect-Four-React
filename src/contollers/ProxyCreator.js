import { proxy } from 'valtio';
import TwoPlayersLogic from '@/logics/TwoPlayersLogic.js';
import OnePlayerLogic from '@/logics/OnePlayerLogic';

// creates the state for the Two Players game
export function CreateNewTwoPlayersProxy() {
    // set the proxy state for the game logic
    const state = proxy({
        gameLogic: new TwoPlayersLogic(),
        currentlyHoveredColumn: null
    });
    return state;
}

// creates the state for the One Player game
export function CreateNewOnePlayerProxy() {
    // set the proxy state for the game logic
    const state = proxy({
        gameLogic: new OnePlayerLogic(),
        currentlyHoveredColumn: null
    });
    return state;
}
