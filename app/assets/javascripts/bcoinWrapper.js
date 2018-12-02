import bclient from "bclient";
import { create } from "domain";

let walletClient = new bclient.WalletClient({ network: "simnet", port: 18558 });
let nodeClient = new bclient.NodeClient({ network: "simnet", port: 18556 });

function makeid() {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

console.log(makeid());

export const getAccount = async () => {
  return walletClient.getAccount("primary", "default");
};

export const createAccount = async () => {
  return walletClient.createAccount("primary", makeid());
};

export const createMultisigAccount = async accounts => {
  let account = await createAccount();

  let accName = makeid();

  await walletClient.createAccount("primary", accName, {
    witness: true,
    watchOnly: true,
    type: "multisig",
    m: 2,
    n: accounts.length + 1,
    accountKey: account.accountKey
  });

  await walletClient.addSharedKey("primary", accName, accounts[0]);

  let address = await walletClient.createAddress("primary", accName);

  await nodeClient.execute("generatetoaddress", [200, address.address]);

  return accName;
};

export const createProject = async accName => {
  let coins = await walletClient.getCoins("primary", accName);
  let address = await walletClient.createAddress("primary", accName);

  console.log(coins[0].hash);

  let output = {};
  output[address.address] = 51 * 10 ** 8;

  console.log(address.address);

  console.info([[{ txid: coins[0].hash, vout: 0 }], output]);

  return await nodeClient.execute("createpsbt", [
    [{ txid: coins[0].hash, vout: 0 }],
    output
  ]);
};
