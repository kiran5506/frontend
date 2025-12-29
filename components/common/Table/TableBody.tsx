import Image from 'next/image';
import React, { CSSProperties } from 'react'
import { BsPencilSquare, BsEye, BsFillTrash3Fill } from "react-icons/bs";

const isImage = (value: any): boolean => {
    if (typeof value !== 'string') {
        return false;
    }
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    return imageExtensions.some(ext => value.toLowerCase().endsWith(ext));
};

interface TableBodyProps {
  bodyData: any[];
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  isview?: boolean;
  isedit?: boolean;
  isdelete?: boolean;
  headerData: string[];
  loading?: boolean;
}

const TableBody = ({ bodyData, onView, onEdit, onDelete, isview, isedit, isdelete, headerData, loading }: TableBodyProps) => {
    const commonStyle: CSSProperties = {
        textAlign: 'center',
        color: 'red',
    };

    console.log('bodydata--->', bodyData)

    const confirmDelete = (id: string) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this item?");
        if (isConfirmed && onDelete) {
            onDelete(id);
        }
    };
    if (loading) {
        return (
            <tbody>
                <tr>
                    <td colSpan={headerData.length} style={commonStyle}>
                        Loading...
                    </td>
                </tr>
            </tbody>
        );
    }

    return (
        <tbody>
            {bodyData && bodyData.length > 0 ? (
                bodyData.map((row: any, index: number) => (
                    <tr key={index} id={row._id}>
                        {Object.entries(row).map(([key, cell]: [string, any], cindex: number) => (
                            key !== 'linkUrl' && key !== 'link_url' && (
                                <td key={cindex} data-label={key}>
                                    {key === 'createdAt' ? (
                                        // Format the createdAt field as a date
                                        new Date(cell as string | number).toLocaleDateString('en-US', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true,
                                        }).replace(',', '').replace(/^(\d{2})\/(\d{2})\/(\d{4})/, '$2-$1-$3')
                                    ) : isImage(cell) ? (
                                        <a href={row.link || '#'} target="_blank" rel="noopener noreferrer">
                                            <Image
                                                src={`/api/image-proxy?url=${encodeURIComponent(cell)}`}
                                                alt={`image-${index}-${cindex}`}
                                                width={100}
                                                height={50}
                                                style={{ maxWidth: '100px', maxHeight: '50px', objectFit: 'contain' }}
                                                unoptimized
                                            />
                                        </a>
                                    ) : typeof cell === 'boolean' ? (
                                        <span className={cell ? 'text-success' : 'text-danger'}>
                                            {cell ? 'Paid' : 'Not Paid'}
                                        </span>
                                    ) : (
                                        cindex === 0 ? index + 1 : cell
                                    )}
                                </td>
                            )
                        ))}
                        <td>
                            {isview && onView && <button className='btn btn-primary btn-sm' onClick={() => onView(row._id)} style={{ marginRight: "3px" }}> <BsEye /></button>}
                            {isedit && onEdit && <button className='btn btn-info btn-sm' onClick={() => onEdit(row._id)} style={{ marginRight: "3px" }}> <BsPencilSquare /> </button>}
                            {isdelete && <button className='btn btn-danger btn-sm' onClick={() => confirmDelete(row._id)}><BsFillTrash3Fill /> </button>}
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={headerData.length} style={commonStyle}>No data available..</td>
                </tr>
            )}
        </tbody>
    )
}

export default TableBody