import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col } from 'react-bootstrap';
import _ from 'lodash';
import Pagination from './Pagination.jsx';
import { actions } from '../slices';

const renderRepo = (data) => {
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

export default () => {
  const companyId = useSelector(({ companies }) => companies.currentCompanyId);
  const allRepos = useSelector(({ repos }) => repos.reposByCompanyId[companyId]);

  if (allRepos.length === 0) {
    return (
      <p className="text-center">This company has not posted repos yet.</p>
    );
  }
  const currentPage = useSelector(({ repos }) => repos
    .uiState.currentPaginationPageByCompanyId[companyId]);
  const dispatch = useDispatch();

  const companyName = allRepos[0].owner.login;
  const reposPerPage = 3;
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = allRepos.slice(indexOfFirstRepo, indexOfLastRepo);

  const paginate = (pageNumber) => {
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
