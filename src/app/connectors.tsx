import { InjectedConnector } from "@web3-react/injected-connector";
import { TorusConnector } from "@web3-react/torus-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

export const Torus = new TorusConnector({
  chainId: process.env.environment == "production" ? 1 : 11155111,
});

export const Injected = new InjectedConnector({
  supportedChainIds: [1, 11155111],
});

export const Walletlink = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/${process.env.infura}`,
  appName: "DiMe",
  supportedChainIds: [1, 11155111],
  appLogoUrl:
    "https://www.the-hash.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.3320537b.png&w=256&q=75",
});

export const WalletConnect = new WalletConnectConnector({
  infuraId: process.env.infura,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  supportedChainIds: [1, 11155111],
});
