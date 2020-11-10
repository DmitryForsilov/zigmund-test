/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const fetchRepos = async (companyName: string): Promise<any> => {
  const url = `https://api.github.com/orgs/${companyName}/repos?per_page=100`;
  const response = await axios.get(url);

  return response;
};

export default {
  fetchRepos,
};
