import bclient from "bclient";

let walletClient = new bclient.WalletClient({ network: "simnet", port: 18558 });

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
