const ethUtil = require("ethereumjs-util");
const SECRET = 'TEST_SECRET';

module.exports.checkSignature = async (req, res, next) => {
  console.log("Checking auth...");
  const signature = req.headers["x-auth-signature"];
  const wallet = req.headers["x-auth-wallet"];

  let nonce = "\x19Ethereum Signed Message:\n" + SECRET.length + SECRET;

  nonce = ethUtil.keccak(Buffer.from(nonce, "utf-8"));
  const { v, r, s } = ethUtil.fromRpcSig(signature);
  const publicKey = ethUtil.ecrecover(ethUtil.toBuffer(nonce), v, r, s);
  const addressBuffer = ethUtil.pubToAddress(publicKey);
  const address = ethUtil.bufferToHex(addressBuffer);

  if (address !== wallet) {
    const error = new Error("Unauthorized");
    error.status = 401;
    return next(error);
  }

  next();
}