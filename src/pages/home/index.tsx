import React from 'react';
import CompanyForm from '../../components/CompanyForm';
import CompaniesList from '../../components/CompaniesList';

const HomePage: React.FC = () => (
  <>
    <CompanyForm />
    <CompaniesList />
  </>
);

export default HomePage;
