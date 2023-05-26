import {useState, useEffect, memo, useLayoutEffect} from 'react';
import {cn as bem} from '@bem-react/classname'
import './style.css';
import PropTypes from "prop-types";

function Pagination({currentPage, pages, onPageClick }) {
  const cn = bem('Pagination');
  const [visiblePages, setVisiblePages] = useState([]);

  const callbacks = {
    onPageClick: (page) => {
      onPageClick(page);
    }
  }

  useLayoutEffect(() => {
    const generateButtons = () => {
      const dots = '...';
      const allPages = Array.from({ length: pages }, (_, index) => index + 1);

      if (pages < 6) {
        setVisiblePages(allPages);
      } else if (currentPage >= 1 && currentPage <= 2) {
        setVisiblePages([1, 2, 3, dots, pages]);
      } else if (currentPage === 3) {
        const sliced = allPages.slice(0, 4);
        setVisiblePages([...sliced, dots, pages]);
      } else if (currentPage >= 4 && currentPage < pages - 2) {
        const sliced1 = allPages.slice(currentPage - 2, currentPage);
        const sliced2 = allPages.slice(currentPage, currentPage + 1);
        setVisiblePages([1, dots, ...sliced1, ...sliced2, dots, pages]);
      } else if (currentPage > pages - 3) {
        const sliced = allPages.slice(pages - 4);
        setVisiblePages([1, dots, ...sliced]);
      }
    };

      generateButtons();

    }, [currentPage, pages]);

  return (
    <div className={cn()}>
      {visiblePages.map((item, index) => (
      <span
        key={index}
        className={item === '...' ? cn('dots') : cn('page', {active: currentPage === item})}
        onClick={() => callbacks.onPageClick(item)}
      >
        {item}
      </span>
    ))}
    </div>
    );
}

export default memo(Pagination);

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageClick: PropTypes.func.isRequired
}
