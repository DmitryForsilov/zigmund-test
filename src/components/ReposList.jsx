import React from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import _ from 'lodash';

const renderRepo = (data) => {
  const {
    name, url, forks_count, watchers_count, stargazers_count, id,
  } = data;

  return (
    <div className="border mb-2" key={id}>
      <h3 className="border-bottom p-2 bg-info text-light">
        {name}
      </h3>
      <Col>
        <p>
          <span className="font-weight-bold">URL: </span>
          <a href={url}>{url}</a>
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
  const currentRepos = useSelector(({ companies, repos }) => {
    const { currentCompanyId } = companies;

    return repos[currentCompanyId];
  });
  const companyName = currentRepos[0].owner.login;

  return (
    <div className="d-flex flex-column">
      <h1 className="mb-2">{`${_.capitalize(companyName)}'s repos`}</h1>
      {currentRepos.length > 0
        ? currentRepos.map(renderRepo)
        : <p className="text-center">This company has not posted repos yet.</p>}
    </div>
  );
};
