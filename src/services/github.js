import axios from 'axios';
import config from '../config';

const { githubAPIUrl, githubAPIToken } = config;
const validateStatus = () => true;

export const getUser = userName =>
  new Promise(async (resolve, reject) => {
    try {
      const url = `${githubAPIUrl}/users/${userName}`;
      const { data: response } = await axios({
        method: 'get',
        url,
        headers: {
          Authorization: `token ${githubAPIToken}`,
        },
        validateStatus,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const getUserClosestMatch = searchUserName =>
  new Promise(async (resolve, reject) => {
    try {
      const url = `${githubAPIUrl}/search/users?q=${searchUserName}`;
      const { data: response } = await axios({
        method: 'get',
        url,
        headers: {
          Authorization: `token ${githubAPIToken}`,
        },
        validateStatus,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const getUserRepos = userName =>
  new Promise(async (resolve, reject) => {
    try {
      const url = `${githubAPIUrl}/users/${userName}/repos`;
      const { data: response } = await axios({
        method: 'get',
        url,
        headers: {
          Authorization: `token ${githubAPIToken}`,
        },
        validateStatus,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const getReadme = (repoOwner, repo) =>
  new Promise(async (resolve, reject) => {
    try {
      const url = `${githubAPIUrl}/repos/${repoOwner}/${repo}/readme`;
      const { data: response } = await axios({
        method: 'get',
        url,
        headers: {
          Authorization: `token ${githubAPIToken}`,
          Accept: 'application/vnd.github.VERSION.raw',
        },
        validateStatus,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
