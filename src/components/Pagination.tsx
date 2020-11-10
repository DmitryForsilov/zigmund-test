/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Pagination } from 'react-bootstrap';
import utils from '../utils';

type Paginate = (num: number) => void;

interface IProcessPaginationDataArgs {
  itemsPerPage: number,
  totalItems: number,
  currentPage: number,
}

interface IPaginationComponentProps extends IProcessPaginationDataArgs {
  paginate: Paginate,
}

interface IprocessPaginationDataReturn {
  firstNumber: number,
  lastNumber: number,
  maxPagesCount: number,
  paginationNumbersToRender: any[]
}

interface IOnClickPrevArgs {
  currentPage: number,
  paginate: Paginate,
}

interface IOnClickNextArgs extends IOnClickPrevArgs {
  maxPagesCount: number,
}

interface IRenderPaginationNumber extends IOnClickPrevArgs {
  number: number,
}

const processPaginationData = (
  inputData: IProcessPaginationDataArgs,
): IprocessPaginationDataReturn => {
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
  const numbersChunks = utils.createChunks(allNumbers, maxVisibleNumbers);

  const paginationNumbersToRender = numbersChunks
    .find((chunk) => chunk.includes(currentPage)) || [];

  return {
    firstNumber, lastNumber, maxPagesCount, paginationNumbersToRender,
  };
};

const renderPaginationNumber = ({ number, paginate, currentPage }: IRenderPaginationNumber) => (
  <Pagination.Item key={number} onClick={() => paginate(number)} active={number === currentPage}>
    {number}
  </Pagination.Item>
);

const onClickPrev = ({ paginate, currentPage }: IOnClickPrevArgs) => () => {
  if (currentPage === 1) {
    return;
  }

  paginate(currentPage - 1);
};

const onClickNext = ({ paginate, currentPage, maxPagesCount }: IOnClickNextArgs) => () => {
  if (currentPage === maxPagesCount) {
    return;
  }

  paginate(currentPage + 1);
};

const PaginationComponent: React.FC<IPaginationComponentProps> = (props) => {
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

export default PaginationComponent;
