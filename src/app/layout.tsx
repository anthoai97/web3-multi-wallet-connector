"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3ReactProvider getLibrary={getLibrary}>
          {children}
        </Web3ReactProvider>
      </body>
    </html>
  );
}
