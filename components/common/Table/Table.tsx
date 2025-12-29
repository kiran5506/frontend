import React, { useState } from 'react'
import TableHeader from './TableHeader'
import TableBody from './TableBody'

interface TableProps {
  headerData: string[];
  bodyData: any[];
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  isview?: boolean;
  isedit?: boolean;
  isdelete?: boolean;
  loading?: boolean;
}

const Table = ({ headerData, bodyData, onView, onEdit, onDelete, isview, isedit, isdelete, loading }: TableProps) => {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredData = bodyData.filter((row: any) =>
        Object.values(row).some((value: any) => {
            if (searchTerm.toLowerCase() === 'paid') {
                return String(true).toLowerCase().includes(searchTerm.toLowerCase())
            } else if (searchTerm.toLowerCase() === 'not paid') {
                return String(false).toLowerCase().includes(searchTerm.toLowerCase())
            }
            return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        })
    )
    
    return (
        <>
            <div className="col-md-4" style={{ marginBottom: `6px` }}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input form-control"
                />
            </div>

            <table className="responsive-table-new">
                <TableHeader headerData={headerData} />
                <TableBody bodyData={filteredData} onView={onView} onEdit={onEdit} onDelete={onDelete} isview={isview} isedit={isedit} isdelete={isdelete} headerData={headerData} loading={loading} />
            </table>
        </>
    )
}

export default Table