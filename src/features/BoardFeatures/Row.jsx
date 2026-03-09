import Cell  from './Cell.jsx'

export default function Row({row}){
    return (
        <div className='flex gap-2'>
            {
                row.cells.map(cell => (
                    <Cell key={cell.id} color={cell.color} row={row.row} cell={cell.cell} 
                    ></Cell>
                ))
            }
        </div>
    )
}