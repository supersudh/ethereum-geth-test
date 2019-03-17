require('dotenv').config();
const web3 = require('web3');
// const { Eth } = require('web3-eth');


(async () => {
  try {
    const web3Instance = new web3(
      // new web3.providers.HttpProvider(process.env.GETH_URL)
      new web3.providers.HttpProvider('HTTP://127.0.0.1:7545')
    );
    // const eth = new Eth('http://localhost:7545');
    // const res = await web3Instance.eth.net.isListening();
    // const accounts = await eth.getAccounts();
    console.time('bal');
    const bal = web3Instance.eth.getBalance('0xbfE5c062FAF481d4D0fB01299c7a8f446D9789CB');
    console.timeEnd('bal');
    console.log(bal.toString(), bal.length);
    console.log(web3Instance.fromWei(bal, 'ether').toString());
  } catch (e) {
    throw e;
  }
})();