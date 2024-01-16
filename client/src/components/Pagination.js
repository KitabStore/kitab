import React from 'react'
import './styles/pagination.css'

const Pagination = ({totalPosts, postsPerPage, currentPage, setCurrentPage}) => {

    let pages = [];
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    for(let i = 1; i <= totalPages; i++){
        pages.push(i);
    }

    return (
    <div>
        <ul className="pagination pagination-lg justify-content-center">
            {
                pages.map((page, index) => {
                    return(<li className="page-item" key={index} >
                                <div className={`page-link bg-dark text-white border-0 ${page === currentPage && 'current'}`} onClick={() => {setCurrentPage(page); window.scrollTo(0,200);}}>
                                    {page}
                                </div>
                            </li>)
                })
            }
            <li className="page-item"><div className="page-link bg-dark text-white border-0" onClick={() => setCurrentPage((currentPage % totalPages) + 1)}>Next</div></li>
        </ul>
    </div>
    )
}

export default Pagination;
