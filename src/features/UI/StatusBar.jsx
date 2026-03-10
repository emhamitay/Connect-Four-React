 //import Status from '@/model/Status'

 export default function StatusBar({currentPlayer, status, winner}){

    //set emoji and first color letter in an upper case
    function getMatchingColorString(color){
        const emoji = color === 'red' ? "🔴 " : "🔵 "
        return emoji + color.slice(0,1).toUpperCase() + color.slice(1);
    }

    let colorText = '';
    if(status === 'playing') colorText = getMatchingColorString(currentPlayer);
    else if (status === 'finished') colorText = getMatchingColorString(winner);
    
    return (
        <>
            <p className="self-center rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                {status === 'playing' && colorText + "'s Turn"}
                {status === 'finished' && colorText + " is the Winner"}
            </p>

        </>
    );
 }
