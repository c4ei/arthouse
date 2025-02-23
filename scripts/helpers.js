const { ethers } = require("ethers");
const fs = require('fs');
const { CONTRACT_DEPLOYMENT_WALLET_PRIVATE_KEY, rpcApiKeyMumbai} = process.env;

const chainConfigFilePath = './src/config-chains.json';
// Helper method for fetching a connection provider to the Ethereum network
function getAvailableChains() {
    let chainConfigRaw = fs.readFileSync(chainConfigFilePath);

    let chainConfigs = JSON.parse(chainConfigRaw);
    return chainConfigs
}

const hardHatSettings = {
    networks: {
      c4ei: {
        url: `https://rpc.c4ei.net`,
        accounts: [`0x${CONTRACT_DEPLOYMENT_WALLET_PRIVATE_KEY}`],
        chainId: 21004
      },
      mumbai: {
          url: `https://polygon-mumbai.infura.io/v3/${rpcApiKeyMumbai}`,
          accounts: [`0x${CONTRACT_DEPLOYMENT_WALLET_PRIVATE_KEY}`],
          chainId: 80001
        },
        alfajores: {
          url: `https://alfajores-forno.celo-testnet.org`,
          accounts: [`0x${CONTRACT_DEPLOYMENT_WALLET_PRIVATE_KEY}`],
          chainId: 44787
        },
        rinkeby: {
          url: `https://rinkeby.infura.io/v3/${rpcApiKeyMumbai}`,
          accounts: [`0x${CONTRACT_DEPLOYMENT_WALLET_PRIVATE_KEY}`],
          chainId: 4
        },
        harmonytestnet: {
          url: `https://api.s0.b.hmny.io`,
          accounts: [`0x${CONTRACT_DEPLOYMENT_WALLET_PRIVATE_KEY}`],
          chainId: 1666700000
        },
        bsctestnet: {
          url: `https://data-seed-prebsc-1-s1.binance.org:8545`,
          accounts: [`0x${CONTRACT_DEPLOYMENT_WALLET_PRIVATE_KEY}`],
          chainId: 97
        },
        binance: {
          url: `https://bsc-dataseed.binance.org`,
          accounts: [`0x${CONTRACT_DEPLOYMENT_WALLET_PRIVATE_KEY}`],
          chainId: 56
        },
        polygon: {
          url: `https://polygon-rpc.com`,
          accounts: [`0x${CONTRACT_DEPLOYMENT_WALLET_PRIVATE_KEY}`],
          chainId: 137
        }
    }
};

// Helper method for fetching a connection provider to the Ethereum network
function getNetworkSetting(chainId) {
    return Object.values(hardHatSettings.networks).find(chainSettings => chainSettings.chainId == chainId);
}


// Helper method for fetching a connection provider to the Ethereum network
function getProvider(chainId) {
    const hardhatChainNetwork = getNetworkSetting(chainId);
    return ethers.getDefaultProvider(hardhatChainNetwork?.url);
}

// Helper method for fetching a wallet account using an environment variable for the PK
function getAccount(chainId) {

    const hardhatChainNetwork = getNetworkSetting(chainId);
    if (!hardhatChainNetwork) {
        console.error("\x1b[33m%s\x1b[0m", `No matching chainId found for network: '${chainId}', using localhost.`);
        return null
    }
    return new ethers.Wallet(hardhatChainNetwork? hardhatChainNetwork.accounts[0]:"", getProvider(chainId));
}

module.exports = {
    getAvailableChains,
    chainConfigFilePath,
    hardHatSettings,
    getProvider,
    getAccount,
    getNetworkSetting
}
