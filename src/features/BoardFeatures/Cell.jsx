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
        none : 'bg-slate-300/70 border-slate-400/80',
        noneHover : 'bg-slate-200 border-slate-300',
        blue : 'bg-blue-500 border-blue-300 shadow-[inset_0_7px_12px_rgba(255,255,255,0.45)]',
        blueHover : 'bg-blue-400 border-blue-200 shadow-[inset_0_7px_12px_rgba(255,255,255,0.5)]',
        red : 'bg-red-500 border-red-300 shadow-[inset_0_7px_12px_rgba(255,255,255,0.45)]',
        redHover : 'bg-red-400 border-red-200 shadow-[inset_0_7px_12px_rgba(255,255,255,0.5)]'
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
                    "h-10 w-10 rounded-full border-2 transition-colors sm:h-12 sm:w-12", //default css
                    colorcss[effectiveColor], //add matching bg-color (depends on the current color[empty cell, red cell or blue] and if hovered)
                    { 'cursor-default' : status === Status.FINISHED, 'cursor-pointer' : status !== Status.FINISHED }
                )}
                >
            </button>
        </>
    )
}