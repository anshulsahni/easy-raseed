import axios from 'axios';

const apiBase = apiUrl;

export function addReceipt(data) {
  return sendRequest({
    path: `/receipts`,
    method: 'POST',
    data,
  });
}

function sendRequest(params) {
  return axios({
    url: apiBase + params.path,
    method: params.method,
    data: params.data,
  });
}
