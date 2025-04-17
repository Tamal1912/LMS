import Web3 from 'web3';
import dotenv from 'dotenv';

dotenv.config();

// Web3 provider
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.SEPOLIA_RPC));

// Clean up the private key
let privateKey = process.env.WALLET_PRIVATE_KEY.trim();

// Add '0x' prefix if it's missing
if (!privateKey.startsWith('0x')) {
  privateKey = '0x' + privateKey;
}

console.log("🔐 Private Key Length:", privateKey.length);
console.log("🔐 Private Key Preview (first 10 chars):", privateKey.slice(0, 10)); // Just preview first 10 characters

// Manually try to create an account from the private key
try {
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  console.log("✅ Private Key is valid! Account Address:", account.address);
} catch (error) {
  console.error("❌ Web3 cannot create account from private key:", error.message);
}
