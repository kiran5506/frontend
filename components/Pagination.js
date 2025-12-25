import React from 'react'
import Link from 'next/link'

const Pagination = () => {
  return (
    <div>
        <ul id="pagination">
            <li><Link href="#">«</Link> </li>
            <li><Link href="#">1</Link> </li>
            <li><Link href="#" className="active">2</Link> </li>
            <li><Link href="#">3</Link></li>
            <li><Link href="#">4</Link></li>
            <li><Link href="#">5</Link></li>
            <li><Link href="#">6</Link></li>
            <li><Link href="#">7</Link></li>
            <li><Link href="#">»</Link></li>
        </ul>
    </div>
  )
}

export default Pagination
