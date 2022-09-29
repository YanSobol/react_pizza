import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCurrentPage,
  filterSelector,
} from "../../redux/slices/filterSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const { itemsCount, itemsPerPage, currentPage } = useSelector(filterSelector);
  return (
    <>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) =>
          dispatch(changeCurrentPage(event.selected + 1))
        }
        forcePage={currentPage - 1}
        pageRangeDisplayed={5}
        pageCount={Math.ceil(itemsCount / itemsPerPage)}
        previousLabel="<"
        renderOnZeroPageCount={undefined}
      />
    </>
  );
};

export default Pagination;
