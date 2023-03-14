import tw from "tailwind-styled-components";

export const LeaderboardMainDiv = tw.div`
    max-h-[600px] 
    max-w-[800px] 
    h-[800px]
    flex
    flex-col
    text-center
    border-2
    border-slate-700 
`

export const Header = tw.div`
    p-4
    text-xl
    font-cormorant-sc

`

export const Intro = tw.div`
    text-xs
    font-cormorant-sc
    font-black
    w-2/3
    self-center
    border-b-2
    border-slate-700 
    border-t-2 
    mt-1
    mb-5
    mr-20
    ml-20
    py-3
`

export const MainDiv = tw.div`
    flex-col
    text-sm
    font-cormorant-sc
    font-black
    text-center
    justify-center
`
export const TopScoreDiv = tw.div`
    p-2
`


export const TableRow = tw.div`
    table-row
`


export const LeaderboardTable = tw.div`
    table w-full
    justify-center
    place-content-center
    hidden 
`

export const TableHeader = tw.div`
    table-header-group
`

export const LeftTableCell = tw.div`
    table-cell 
    text-center
`

export const RightTableCell = tw.div`
    table-cell
    text-right
`

export const TableRowGroup = tw.div`
    table-row-group
`

export const LeftTableCellHeader = tw.div`
    underline
    decoration-dashed
`

export const RightTableCellHeader = tw.p`
    underline
    decoration-dashed
    table-cell
    text-right
`