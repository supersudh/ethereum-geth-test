require('dotenv').config();
const web3 = require('web3');
const ethTx = require('ethereumjs-tx');
const bip39 = require('bip39');
const hdkey = require('hdkey');
const ethUtil = require('ethereumjs-util');

const { nwsPost } = require('./callNWS');
const l = console.log;

// const MNEMONIC = 'timber sleep tourist property profit decide garden pave capable novel turn tape';

const MNEMONIC = 'torch sign lounge fire genius daring approve approve wool pet cable dumb';

const seed = bip39.mnemonicToSeed(MNEMONIC);
const root = hdkey.fromMasterSeed(seed);

var path = "m/44'/60'/0'/0/1";
const addrNode = root.derive(path);

const pubKey = ethUtil.privateToPublic(addrNode._privateKey)
const addr = ethUtil.publicToAddress(pubKey).toString('hex');
const address = ethUtil.toChecksumAddress(addr);

// const prevGen = '0xf86d018502540be40083030d40949ee356756efbb8c98c1c96aa07fd79ebd5f3fb5b88016345785d8a0000802ba0de1c30403d997a64f5c913a785d6cd516b066b1c3dc4c9005c04f47c0edd39cea03ed15385b038cd7995c5b7cb0120f310cb31d3a8d62036c60c1b7f517f7370e5';

const toAddress = '0xc5E7DA52870a75A3670CEc2666Df45faB47A8363';

(async () => {
  try {
    const web3Instance = new web3(
      // new web3.providers.HttpProvider(process.env.GETH_URL)
      new web3.providers.HttpProvider('HTTP://127.0.0.1:7545')
    );

    const txCount = await web3Instance.eth.getTransactionCount(address);

    l('txCount', txCount);

    const toWei = web3Instance.toWei(200);
    const transferringValue = web3Instance.toHex(toWei);

    const params = {
      nonce:  web3Instance.toHex(txCount),
      to: toAddress,
      value: transferringValue,
      gasLimit: web3Instance.toHex(6721975),
      gasPrice: web3Instance.toHex(20000000000),
      chainId: 5777
    };
    
    const tx = new ethTx(params);
    // //Signing the transaction with the correct private key
    tx.sign(addrNode._privateKey);
    const serializedTx = tx.serialize();
    const toHexTx = '0x' + serializedTx.toString('hex');

    l('hex ->', toHexTx);
    // console.log(toHexTx === prevGen);

    const gasEstimate = await web3Instance.eth.estimateGas({
      to: params.to,
      data: toHexTx
    });

    l('gas ~>', gasEstimate);

    // const signedRet = await web3Instance.eth.sendRawTransaction(toHexTx);

    const ret = await nwsPost('api/ethereumWallet/sendRawTransaction', { hex: toHexTx });

    l('ret ~>', ret);
  } catch (e) {
    console.log(68);
    console.log(Object.keys(e));
    throw e;
  }
})();