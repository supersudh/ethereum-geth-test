const web3 = require('web3');
const ethTx = require('ethereumjs-tx');
const bip39 = require('bip39');
const hdkey = require('hdkey');
const { Eth } = require('web3-eth');
const ethUtil = require('ethereumjs-util');

const MNEMONIC = 'timber sleep tourist property profit decide garden pave capable novel turn tape';

const seed = bip39.mnemonicToSeed(MNEMONIC);
const root = hdkey.fromMasterSeed(seed);

var path = "m/44'/60'/0'/0/0";
const addrNode = root.derive(path);

const pubKey = ethUtil.privateToPublic(addrNode._privateKey)
const addr = ethUtil.publicToAddress(pubKey).toString('hex');
const address = ethUtil.toChecksumAddress(addr);

(async () => {
  try {
    const Web3 = new web3(process.env.GETH_URL);

    const txCount = await Web3.eth.getTransactionCount(address);

    console.log('txCount', txCount);

    const params = {
      nonce:  Web3.utils.toHex(txCount),
      to: '0x9f0d61dF16Ca522eeC35d5c77F52322493d0035a',
      value: Web3.utils.toHex('50000000'),
      gasLimit: Web3.utils.toHex(21000),
      gasPrice: Web3.utils.toHex(5000000000),
      chainId: 4
    };
    const tx = new ethTx(params);
    //Signing the transaction with the correct private key
    const ret = tx.sign(addrNode._privateKey);
    const serializedTx = tx.serialize();

    console.log('ret',ret);
    console.log(serializedTx);

    // const ret = await Web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));

    console.log(ret);

    // const transact = () => new Promise((resolve ,reject) => {
    //   eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
    //     .on('receipt', (receipt) => {
    //       console.log('receipt ->');
    //       console.log(receipt);
    //     })
    //     .on('confirmation')
    // });
  } catch (e) {
    throw e;
  }
})();