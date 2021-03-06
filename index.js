require('dotenv').config();
const bip39 = require('bip39');
const hdkey = require('hdkey');
const ethUtil = require('ethereumjs-util');

const MNEMONIC = 'aisle siren gather gas together reject humble elegant advice old solar sentence';

(async () => {
  // 1. Seed from mnemonic
  const seed = bip39.mnemonicToSeed(MNEMONIC);

  const root = hdkey.fromMasterSeed(seed);

  const masterPrivateKey = root.privateKey.toString('hex');
  const masterPubKey = root.publicKey.toString('hex');

  var path = "m/44'/60'/0'/0/0";
  const addrNode = root.derive(path)
  const pubKey = ethUtil.privateToPublic(addrNode._privateKey)
  const addr = ethUtil.publicToAddress(pubKey).toString('hex');
  const address = ethUtil.toChecksumAddress(addr)
  console.log(address);
  console.log('privatekey', addrNode._privateKey.toString('hex'));
})();