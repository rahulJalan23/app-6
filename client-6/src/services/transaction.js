import axios from 'axios';
import backendUrl from './backendUrl';

const getAllTransactions = async (token) => {
  let config = {
    headers: {
      'x-access-token': token,
    },
  };
  console.log(config);
  const response = await axios.get(`${backendUrl}/transaction/get`, config);
  return response.data;
};

const addTransaction = async (data, token) => {
  let config = {
    headers: {
      'x-access-token': token,
    },
  };
  console.log(config);
  const response = await axios.post(
    `${backendUrl}/transaction/create`,
    data,
    config
  );
  return response.data;
};

const transService = { getAllTransactions, addTransaction };
export default transService;
