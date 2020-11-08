import React from 'react';
import { Pagination } from 'react-bootstrap';
import createChunks from '../utils/createChunks.js';

const processPaginationData = (inputData) => {
  const {
    itemsPerPage, totalItems, currentPage,
  } = inputData;

  const maxPagesCount = Math.ceil(totalItems / itemsPerPage);
  const allNumbers = [];

  for (let i = 1; i <= maxPagesCount; i += 1) {
    allNumbers.push(i);
  }

  const firstNumber = allNumbers[0];
  const lastNumber = allNumbers[allNumbers.length - 1];
  const maxVisibleNumbers = 4;
  const numbersChunks = createChunks(allNumbers, maxVisibleNumbers);

  const paginationNumbersToRender = numbersChunks.find((chunk) => chunk.includes(currentPage));

  return {
    firstNumber, lastNumber, maxPagesCount, paginationNumbersToRender,
  };
};

const renderPaginationNumber = ({ number, paginate, currentPage }) => (
  <Pagination.Item key={number} onClick={() => paginate(number)} active={number === currentPage}>
    {number}
  </Pagination.Item>
);

const onClickPrev = ({ paginate, currentPage }) => () => {
  if (currentPage === 1) {
    return;
  }

  paginate(currentPage - 1);
};

const onClickNext = ({ paginate, currentPage, maxPagesCount }) => () => {
  if (currentPage === maxPagesCount) {
    return;
  }

  paginate(currentPage + 1);
};

export default (props) => {
  const {
    itemsPerPage, totalItems, paginate, currentPage,
  } = props;

  const {
    firstNumber, lastNumber, maxPagesCount, paginationNumbersToRender,
  } = processPaginationData({ itemsPerPage, totalItems, currentPage });

  return (
    <Pagination>
      <Pagination.First onClick={() => paginate(firstNumber)} />
      <Pagination.Prev onClick={onClickPrev({ paginate, currentPage })} />

      {paginationNumbersToRender
        .map((number) => renderPaginationNumber({ number, paginate, currentPage }))}

      <Pagination.Next onClick={onClickNext({ paginate, currentPage, maxPagesCount })} />
      <Pagination.Last onClick={() => paginate(lastNumber)} />
    </Pagination>
  );
};
