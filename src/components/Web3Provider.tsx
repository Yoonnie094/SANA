"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, polygon, arbitrum } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { ReactNode } from "react";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [mainnet, polygon, arbitrum],
    transports: {
      [mainnet.id]: http(),
      [polygon.id]: http(),
      [arbitrum.id]: http(),
    },

    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "00000000000000000000000000000000",

    // Required App Info
    appName: "SANA",
    appDescription: "Protección de datos médicos mediante IA y Blockchain",
  }),
);



const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider theme="auto">
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
