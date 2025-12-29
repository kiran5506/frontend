import React from 'react'

interface TableHeaderProps {
  headerData: string[];
}

const TableHeader = ({ headerData }: TableHeaderProps) => {
    if (!headerData.length) {
        return null;
    }
  return (
    <thead>
        <tr >
        {headerData.map( (hdata: string, index: number) => {
            return <th scope="col" key={hdata + index}>{hdata}</th>
        })}
        </tr>
    </thead>
  )
}

export default TableHeader