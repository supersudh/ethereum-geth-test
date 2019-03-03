const Web3 = require('web3')
const Tx = require('ethereumjs-tx')
const bip39 = require('bip39');
const hdkey = require('hdkey');
const ethUtil = require('ethereumjs-util');
const BigNumber = require('bignumber.js');
const ethers = require('ethers');

const userContract = require('./contracts/user.json');

const MNEMONIC = 'sleep hard dinosaur follow vendor walnut hold mesh vital fragile unique student';

const seed = bip39.mnemonicToSeed(MNEMONIC);

const root = hdkey.fromMasterSeed(seed);

const masterPrivateKey = root.privateKey.toString('hex');
const masterPubKey = root.publicKey.toString('hex');

var path = "m/44'/60'/0'/0/5";
const addrNode = root.derive(path)

let web3 = new Web3(
  new Web3.providers.HttpProvider(
    'http://localhost:7545'
  )
)

const account = '0xb93a5A2533068283A940945993DE13dE6f36B4BC'; //Your account address
const privateKey = addrNode.privateKey;
const contractAddress = userContract.networks['5777'].address;
const abi = userContract.abi;

const _depositingValue = web3.toWei('8', 'ether');
const depositingValue = web3.toHex(_depositingValue);

const contract = web3.eth.contract(abi).at(contractAddress);


const data = contract.deposit.getData(
  '0x9724c1f47dd281447b52e757f5fdcf2e9005d0097dea43a31350b5f98917d201',
  '0x0000000000000000000000000000000000000000',
  12345,
  depositingValue,
);

var gasEstimate = web3.eth.estimateGas({
  from: account,
  to: contractAddress,
  data: data,
  value: depositingValue
});
var gasPrice = web3.eth.gasPrice;
console.log('gas Price: ' + gasPrice);
console.log('Estimated Transaction gas: ' + gasEstimate);

const _nonce = web3.eth.getTransactionCount(account);
nonce = _nonce.toString(16);

console.log("Nonce: " + nonce);
const txParams = {
  gasPrice: 100000,
  gasLimit: 3000000,
  to: contractAddress,
  data: data,
  from: account,
  nonce: '0x' + nonce,
  value: depositingValue
};

const tx = new Tx(txParams);
tx.sign(privateKey); // Transaction Signing here

const serializedTx = tx.serialize();

// const ret = web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'));

// console.log(ret);