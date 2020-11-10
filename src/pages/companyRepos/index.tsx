import React from 'react';
import { Link } from 'react-router-dom';
import ReposList from '../../components/ReposList';

const CompanyReposPage: React.FC = () => (
  <>
    <header className="mb-4 border-bottom pb-2">
      <Link to="/">Home</Link>
    </header>
    <ReposList />
  </>
);

export default CompanyReposPage;
