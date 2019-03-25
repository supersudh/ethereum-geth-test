const axios = require('axios');

const NWS_API_URL = 'http://localhost:3002';

async function nwsGet(pathName) {
  try {
    const { data } = await axios.get(`${NWS_API_URL}/${pathName}`);
    return data;
  } catch (e) {
    throw e;
  }
}

async function nwsPost(pathName, bodyData) {
  try {
    const { data } = await axios.post(
      `${NWS_API_URL}/${pathName}`,
      bodyData,
    );
    return data;
  } catch (e) {
    throw e.response;
  }
}

module.exports = { nwsGet, nwsPost };