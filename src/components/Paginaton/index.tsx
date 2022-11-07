import React from 'react';
import ReactPaginate from "react-paginate";
import styles from './Pagination.module.scss'

type PaginationProps = {
    pageNumber: number,
    onSetPageNumber: (e: number) => void
}

const Pagination:React.FC<PaginationProps> = ({onSetPageNumber, pageNumber}) => {



    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(event) => onSetPageNumber(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={4}
            forcePage={pageNumber - 1}
        />
    );
};

export default Pagination;