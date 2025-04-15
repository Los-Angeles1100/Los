// Попробуем открыть Trust Wallet через 3 секунды
setTimeout(function () {
    // Открытие Trust Wallet (сработает на мобиле, если установлен)
    window.location.href = "trust://";

    // Если не получилось — через 10 секунд редирект на сайт загрузки
    setTimeout(function () {
        window.location.href = "https://trustwallet.com/download";
    }, 3000);
}, 3000);

// После загрузки страницы подключаем Web3
window.addEventListener('load', async function () {
    if (typeof window.ethereum !== 'undefined' || typeof window.web3 !== 'undefined') {
        const web3 = new Web3(window.ethereum);

        try {
            // Запрашиваем доступ к кошельку
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const userAddress = accounts[0];
            console.log("Адрес кошелька:", userAddress);

            // Получаем баланс ETH
            const balanceWei = await web3.eth.getBalance(userAddress);
            const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
            console.log("Баланс ETH:", balanceEth);

            // Можем дополнительно тут получить токены ERC-20, если хочешь
        } catch (err) {
            console.error("Ошибка при подключении к кошельку:", err);
        }
    } else {
        console.error("Web3 не найден. Установите Trust Wallet или MetaMask.");
    }
});
