import React from 'react';
import { useSelector } from 'react-redux';

/* const renderRepo = (repo) => {

}; */

export default () => {
  const currentCompanyId = useSelector(({ companies }) => companies.currentCompanyId);
  const currentRepos = useSelector(({ repos }) => repos[currentCompanyId]);
  

  return (
    repos.map(renderRepo)
  );
};
