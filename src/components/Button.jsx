import { Children } from "react";

export default function Button({children, handleClick=()=>{console.log("Button.jsx didn't get handleClick function")}}){
    return(
       <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-400 transition"
       onClick={handleClick}
       >
        {children}
       </button>
    )
}