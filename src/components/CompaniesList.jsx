import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../slices';

const hadleClick = (id, dispatch) => () => {
  dispatch(actions.setCurretnCompanyId({ companyId: id }));
};

const renderCompanyLink = ({ login, id }, dispatch) => (
  <Link to={`/companyRepos/:${id}`} key={id} onClick={hadleClick(id, dispatch)}>
    <Button className="w-100 mb-2" variant="info">{login}</Button>
  </Link>
);

export default () => {
  const companies = useSelector(({ companies: { companiesList } }) => companiesList);
  const dispatch = useDispatch();

  return (
    <div className="d-flex flex-column">
      {companies.length > 0 && companies.map((company) => renderCompanyLink(company, dispatch))}
    </div>
  );
};
