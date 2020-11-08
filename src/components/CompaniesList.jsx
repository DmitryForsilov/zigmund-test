import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../slices';

const hadleClick = (id, dispatch) => () => {
  dispatch(actions.setCurrentCompanyId({ companyId: id }));
};

const renderCompanyLink = ({ login, id }, dispatch) => (
  <Link to={`/companyRepos/:${id}`} key={id} onClick={hadleClick(id, dispatch)}>
    <Button className="w-100 mb-2" variant="info">{login}</Button>
  </Link>
);

export default () => {
  const companies = useSelector((state) => {
    const { companiesById, allIds } = state.companies;

    return allIds.map((id) => companiesById[id]);
  });
  const dispatch = useDispatch();

  return (
    <div className="d-flex flex-column">
      <p className="mb-2">Companies</p>
      {companies.length > 0
        ? companies.map((company) => renderCompanyLink(company, dispatch))
        : (
          <p className="text-center">Companies are not downloaded yet.</p>
        )}
    </div>
  );
};
