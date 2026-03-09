import { useContext } from "react";
import { EventProviderContext } from '@/context/EventHandlerContext.js';
import Status from '@/model/status';
import clsx from 'clsx';

export default function Cell({row, cell, color
    }){

    //get event handler
    //contains events: handleClick, handleHover, handleUnHover, currentlyHoveredColumn 
    const eventProvider = useContext(EventProviderContext);
    const handleClick = eventProvider.handleClick;
    const handleHover = eventProvider.handleHover;
    const handleUnHover = eventProvider.handleUnHover;
    const currentlyHoveredColumn = eventProvider.currentlyHoveredColumn ;
    const status = eventProvider.gameStatus;

    //check if current column is hovered
    const isColumnHovered = (cell === currentlyHoveredColumn) ? true : false;
    
    //CSS COLOR
    const colorcss = {
        none : 'bg-gray-700',
        noneHover : 'bg-gray-500',
        blue : 'bg-blue-500',
        blueHover : 'bg-blue-300',
        red : 'bg-red-500',
        redHover : 'bg-red-300'
    }

    //add color to css
    const effectiveColor = isColumnHovered ? (color || 'none') + 'Hover' : color || 'none';

    //VIEW
    return(
        <>
            <button 
                onMouseEnter={() => handleHover(cell)} 
                onMouseLeave={() => handleUnHover(cell)}
                onClick={() => handleClick(cell)}
                className={clsx(
                    "text-white rounded-full border-2 border-gray-500 px-5 py-5", //default css
                    colorcss[effectiveColor], //add matching bg-color (depends on the current color[empty cell, red cell or blue] and if hovered)
                    { 'cursor-default' : status === Status.FINISHED }
                )}
                >
            </button>
        </>
    )
}