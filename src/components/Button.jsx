// בס"ד
import { Children } from "react";

export default function Button({children, handleClick=()=>{console.log("Button.jsx didn't get handleClick function")}}){
    return(
       <button className="rounded-xl border border-blue-700/30 bg-gradient-to-b from-blue-600 to-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(42,99,201,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-500 hover:to-blue-700 hover:shadow-[0_10px_24px_rgba(42,99,201,0.35)] active:translate-y-0 active:shadow-[0_4px_10px_rgba(42,99,201,0.25)]"
       onClick={handleClick}
       >
        {children}
       </button>
    )
}