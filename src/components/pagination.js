import React from 'react'
import { Link } from 'gatsby'

const Pagination = ({ pageNumber, hasNextPage }) => {

    let prevLink = null
    if( 2 === pageNumber) {
        prevLink = `/blog/`
    } else if(2 < pageNumber) {
        prevLink = `/blog/page/${pageNumber - 1}`
    }

    let nextLink = null
    if(hasNextPage) {
        nextLink = `/blog/page/${pageNumber + 1}`
    }

    return (
        <nav>
            <ul>
                { prevLink && (
                    <li>
                        <Link to={prevLink}>&lt; Previous Page</Link>
                    </li>
                )}
                { nextLink && (
                    <li>
                        <Link to={nextLink}>Next Page &gt;</Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default Pagination
