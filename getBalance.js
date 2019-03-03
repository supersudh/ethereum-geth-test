const web3 = require('web3');
// const { Eth } = require('web3-eth');


(async () => {
  try {
    const web3Instance = new web3(
      new web3.providers.HttpProvider(process.env.GETH_URL)
    );
    // const eth = new Eth('http://localhost:7545');
    // const res = await web3Instance.eth.net.isListening();
    // const accounts = await eth.getAccounts();
    console.time('bal');
    const bal = web3Instance.eth.getBalance('0x9Ee356756efBb8c98c1C96AA07FD79EBd5f3fb5B');
    console.timeEnd('bal');
    console.log(bal.toString(), bal.length);
    console.log(web3Instance.fromWei(bal, 'ether').toString());
  } catch (e) {
    throw e;
  }
})();