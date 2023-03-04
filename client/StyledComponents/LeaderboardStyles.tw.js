import tw from "tailwind-styled-components";

export const LeaderboardMainDiv = tw.div`
    max-h-[600px] 
    max-w-[800px] 
    h-[800px]
    flex
    flex-col
    border-2
    border-slate-700 
`

export const Header = tw.div`
    p-4
    text-xl
    font-cormorant-sc
`

export const MainDiv = tw.div`
    flex-col
    text-sm
    font-cormorant-sc
    font-black
    min-w-[500px]
`

export const TopScoreDiv = tw.div`
    p-2
`

export const TableRow = tw.div`
    flex
`

export const LeaderboardTable = tw.div`
    justify-center
    place-content-center
    hidden 
`

export const TableHeader = tw.div`
    text-center
`

export const LeftTableCell = tw.div`
    basis-1/3
    text-center
`

export const MiddleTableCell = tw.div`
    basis-1/3
    text-center
`

export const RightTableCell = tw.div`
    basis-1/3
    text-center
`

export const TableRowGroup = tw.div`
    flex
    flex-col
`

export const LeftTableCellHeader = tw.div`
    basis-1/3
    underline
    decoration-dashed
    text-center
`

export const MiddleTableCellHeader = tw.div`
    basis-1/3
    underline
    decoration-dashed
    text-center
`

export const RightTableCellHeader = tw.p`
    basis-1/3
    underline
    decoration-dashed
    text-center
`
