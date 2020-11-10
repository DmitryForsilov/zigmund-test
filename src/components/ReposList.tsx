/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col } from 'react-bootstrap';
import _ from 'lodash';
import Pagination from './Pagination';
import actions from '../redux/actions';
import { RootState } from '../redux/reducers';

interface IRenderRepoArgs {
  name: string,
  svn_url: string,
  forks_count: number,
  watchers_count: number,
  stargazers_count: number,
  id: number,
}

interface IUseSelectorData {
  companyId: number,
  companyName: string,
  allRepos: any[],
  currentPage: number,
}

const renderRepo = (data: IRenderRepoArgs) => {
  const {
    name, svn_url, forks_count, watchers_count, stargazers_count, id,
  } = data;

  return (
    <div className="border mb-2" key={id}>
      <h3 className="border-bottom p-2 bg-info text-light">
        {name}
      </h3>
      <Col>
        <p>
          <span className="font-weight-bold">URL: </span>
          <a href={svn_url} target="_blank" rel="noreferrer">{svn_url}</a>
        </p>
        <p>
          <span className="font-weight-bold">FORKS COUNT: </span>
          {forks_count}
        </p>
        <p>
          <span className="font-weight-bold">WATCHERS COUNT: </span>
          {watchers_count}
        </p>
        <p>
          <span className="font-weight-bold">STARGAZERS COUNT: </span>
          {stargazers_count}
        </p>
      </Col>
    </div>
  );
};

const ReposList: React.FC = () => {
  const {
    companyId, companyName, allRepos, currentPage,
  } = useSelector((state: RootState): IUseSelectorData => {
    const currentId: number = state.companies.currentCompanyId!;
    const currentName: string = state.companies.companiesById[currentId].name;
    const currentRepos: any[] = state.repos.reposByCompanyId[currentId];
    const currentActivePage: number = state.repos
      .uiState.currentPaginationPageByCompanyId[currentId];

    return {
      companyId: currentId,
      companyName: currentName,
      allRepos: currentRepos,
      currentPage: currentActivePage,
    };
  });

  if (allRepos.length === 0) {
    return (
      <p className="text-center">This company has not posted repos yet.</p>
    );
  }

  const dispatch = useDispatch();

  const reposPerPage = 3;
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = allRepos.slice(indexOfFirstRepo, indexOfLastRepo);

  const paginate = (pageNumber: number): void => {
    dispatch(actions.setReposPaginationPage({ companyId, pageNumber }));
  };

  return (
    <div className="d-flex flex-column">
      <h1 className="mb-2">{`${_.capitalize(companyName)}'s repos`}</h1>
      <div className="mb-auto h-100">
        {currentRepos.map(renderRepo)}
      </div>
      <Pagination
        itemsPerPage={reposPerPage}
        totalItems={allRepos.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ReposList;
