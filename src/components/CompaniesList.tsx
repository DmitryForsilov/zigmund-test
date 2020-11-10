import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../redux/actions';
import { RootState } from '../redux/reducers';

type Handler = () => void;
type CompanyData = { name: string, id: number };

const hadleClick = (id: number, dispatch: Dispatch): Handler => (): void => {
  dispatch(actions.setCurrentCompanyId({ companyId: id }));
};

const renderCompanyLink = ({ name, id }: CompanyData, dispatch: Dispatch) => (
  <Link to={`/companyRepos/:${id}`} key={id} onClick={hadleClick(id, dispatch)}>
    <Button className="w-100 mb-2" variant="info">{name}</Button>
  </Link>
);

const CompaniesList: React.FC = () => {
  const companies = useSelector((state: RootState) => {
    const { companiesById, allIds } = state.companies;

    return allIds.map((id: number) => companiesById[id]);
  });
  const dispatch = useDispatch();

  return (
    <div className="d-flex flex-column">
      <p className="mb-2">Companies</p>
      {companies.length > 0
        ? companies.map((company: CompanyData) => renderCompanyLink(company, dispatch))
        : (
          <p className="text-center">Companies are not downloaded yet.</p>
        )}
    </div>
  );
};

export default CompaniesList;
