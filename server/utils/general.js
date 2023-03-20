const secp = require('ethereum-cryptography/secp256k1');
const { toHex } = require('ethereum-cryptography/utils');

const createNewWallet = () => {
  const privateKey = secp.utils.randomPrivateKey();
  const publicKey = secp.getPublicKey(privateKey);

  return {
    privateKey: toHex(privateKey),
    publicKey: toHex(publicKey),
  };
}

module.exports = {
  createNewWallet,
};
