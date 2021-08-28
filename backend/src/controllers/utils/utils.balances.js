const fs = require('fs');
const path = require('path');

const DB_DIR_PATH = "../../db";
const BALANCE_FILE_NAME = "balance.json";

module.exports.getBalances = () => {
  const pathName = path.resolve(__dirname, DB_DIR_PATH, BALANCE_FILE_NAME);
  const balanceExists = fs.existsSync(pathName);

  if (!balanceExists) {
    console.log("Return default balance");
    return [
      { token: "ETH", qty: 0 },
      { token: "USDT", qty: 0 },
      { token: "DVF", qty: 0 }
    ];
  }

  const balances = fs.readFileSync(pathName)
    .toString("utf-8");

  return JSON.parse(balances);
}

module.exports.deposit = (amount, token) => {
  const folderPathName = path.resolve(__dirname, DB_DIR_PATH);
  const filePathName = path.resolve(folderPathName, BALANCE_FILE_NAME);
  const balances = this.getBalances();
  const tokenBalance = balances.find(balance => balance.token === token);

  console.log("Old balance", tokenBalance);
  tokenBalance.qty = tokenBalance.qty + amount;
  console.log("New balance", tokenBalance);

  const folderExists = fs.existsSync(folderPathName);

  if (!folderExists) {
    console.log("Creating folder");
    fs.mkdirSync(folderPathName);
  }

  fs.writeFileSync(filePathName, JSON.stringify(balances));

  return balances;
}