const web3 = require('web3');

(async () => {
  try {
    const web3Instance = new web3(
      new web3.providers.HttpProvider(process.env.GETH_URL)
    );

    const addr = '0x9Ee356756efBb8c98c1C96AA07FD79EBd5f3fb5B';

    const txs = web3Instance.eth;
  } catch (e) {
    throw e;
  }
})();