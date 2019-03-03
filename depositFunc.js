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

var path = "m/44'/60'/0'/0/4";
const addrNode = root.derive(path)

let web3 = new Web3(
  new Web3.providers.HttpProvider(
    'http://localhost:7545'
  )
)

const account = '0x51e2f44c135AfaC72C2ffC3E57590B95A71b40dF'; //Your account address
const privateKey = addrNode.privateKey;
const contractAddress = userContract.networks['5777'].address;
const abi = userContract.abi;

const _depositingValue = web3.utils.toWei('89', 'ether');
const depositingValue = web3.utils.toHex(_depositingValue);

// const depositingValue = web3.toBigNumber('89999999527334199900')

// const depositingValue = ethers.utils.bigNumberify('89999999527334199900');

console.log(depositingValue, typeof depositingValue)

const contract = new web3.eth.Contract(abi, contractAddress, {
  from: account,
  gasLimit: 3000000,
  value: depositingValue
});

// const contract = web3.eth.contract(abi).at(contractAddress);


// const contractFunction = contract.deposit(
//   '0x9724c1f47dd281447b52e757f5fdcf2e9005d0097dea43a31350b5f98917d201',
//   '0x0000000000000000000000000000000000000000',
//   12345,
//   depositingValue,
//   {
//     from: account,
//     value: depositingValue
//   }
// );


const contractFunction = contract.methods.deposit(
  '0x9724c1f47dd281447b52e757f5fdcf2e9005d0097dea43a31350b5f98917d201',
  '0x0000000000000000000000000000000000000000',
  12345,
  depositingValue,
);

const functionAbi = contractFunction.encodeABI();

console.log(functionAbi);

let estimatedGas;
let nonce;

console.log("Getting gas estimate");

// contractFunction.estimateGas({ from: account })
Promise.resolve()
  .then((gasAmount) => {
    // estimatedGas = gasAmount.toString(16);

    // console.log("Estimated gas: " + estimatedGas);

    web3.eth.getTransactionCount(account).then(_nonce => {
      nonce = _nonce.toString(16);

      console.log("Nonce: " + nonce);
      const txParams = {
        gasPrice: 100000,
        gasLimit: 3000000,
        to: contractAddress,
        data: functionAbi,
        from: account,
        nonce: '0x' + nonce,
        value: depositingValue
      };

      const tx = new Tx(txParams);
      tx.sign(privateKey); // Transaction Signing here

      const serializedTx = tx.serialize();

      web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt => {
        console.log('receipt:')
        console.log(receipt);
      })
    });
  })