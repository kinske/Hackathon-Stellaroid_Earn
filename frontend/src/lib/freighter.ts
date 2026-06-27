"use client";

import {
  getAddress,
  getNetworkDetails,
  isConnected,
  requestAccess,
  signTransaction,
} from "@stellar/freighter-api";
import { getExpectedNetworkPassphrase, appConfig } from "@/lib/config";
import { withTimeout } from "@/lib/with-timeout";
import type { WalletSnapshot } from "@/lib/types";

const FREIGHTER_TIMEOUT_MS = 5_000;

const E2E_WALLET_ADDRESS =
  "GAWIOVGFSPJDEIJJZUSVRFPVP3D5VNO2LGCU47KEHJD6MV277QKNR34D";
const E2E_WALLET_STORAGE_KEY = "stellaroid:e2e:wallet-connected";

function buildUnsupportedWallet(error?: string): WalletSnapshot {
  return {
    status: "unsupported",
    address: null,
    network: null,
    networkPassphrase: null,
    isExpectedNetwork: false,
    error: error ?? "Freighter is not available in this browser.",
  };
}

function buildE2EWallet(): WalletSnapshot {
  return {
    status: "connected",
    address: E2E_WALLET_ADDRESS,
    network: appConfig.network,
    networkPassphrase: getExpectedNetworkPassphrase(),
    isExpectedNetwork: true,
  };
}

function getE2EStorage() {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

function isE2EWalletConnected() {
  return getE2EStorage()?.getItem(E2E_WALLET_STORAGE_KEY) === "1";
}

function setE2EWalletConnected(connected: boolean) {
  const storage = getE2EStorage();
  if (!storage) return;

  if (connected) {
    storage.setItem(E2E_WALLET_STORAGE_KEY, "1");
  } else {
    storage.removeItem(E2E_WALLET_STORAGE_KEY);
  }
}

export async function readFreighterWallet(): Promise<WalletSnapshot> {
  if (appConfig.e2eMode) {
    if (isE2EWalletConnected()) {
      return buildE2EWallet();
    }

    return {
      status: "disconnected",
      address: null,
      network: appConfig.network,
      networkPassphrase: getExpectedNetworkPassphrase(),
      isExpectedNetwork: true,
    };
  }

  let connection;
  try {
    connection = await withTimeout(isConnected(), FREIGHTER_TIMEOUT_MS, "Freighter isConnected");
  } catch {
    return buildUnsupportedWallet("Freighter is not available in this browser.");
  }

  if (connection.error) {
    return buildUnsupportedWallet(connection.error);
  }

  if (!connection.isConnected) {
    return {
      status: "disconnected",
      address: null,
      network: null,
      networkPassphrase: null,
      isExpectedNetwork: false,
    };
  }

  const [addressResponse, networkResponse] = await Promise.all([
    getAddress(),
    getNetworkDetails(),
  ]);

  if (addressResponse.error) {
    return {
      status: "disconnected",
      address: null,
      network: null,
      networkPassphrase: null,
      isExpectedNetwork: false,
      error: addressResponse.error,
    };
  }

  if (networkResponse.error) {
    return {
      status: addressResponse.address ? "connected" : "disconnected",
      address: addressResponse.address || null,
      network: null,
      networkPassphrase: null,
      isExpectedNetwork: false,
      error: networkResponse.error,
    };
  }

  const networkPassphrase =
    networkResponse.networkPassphrase || getExpectedNetworkPassphrase();

  const isExpectedNetwork =
    networkPassphrase === getExpectedNetworkPassphrase() ||
    networkResponse.network === appConfig.network;

  return {
    status: addressResponse.address ? "connected" : "disconnected",
    address: addressResponse.address || null,
    network: networkResponse.network ?? null,
    networkPassphrase,
    isExpectedNetwork,
  };
}

export async function connectFreighterWallet() {
  if (appConfig.e2eMode) {
    setE2EWalletConnected(true);
    return buildE2EWallet();
  }

  let access;
  try {
    access = await withTimeout(requestAccess(), FREIGHTER_TIMEOUT_MS, "Freighter requestAccess");
  } catch {
    throw new Error("Freighter did not respond. Is the extension installed?");
  }

  if (access.error) {
    throw new Error(access.error);
  }

  return readFreighterWallet();
}

export function disconnectFreighterWallet() {
  if (appConfig.e2eMode) {
    setE2EWalletConnected(false);
  }
}

export async function signWithFreighter(transactionXdr: string, address: string) {
  if (appConfig.e2eMode) {
    return transactionXdr;
  }

  const result = await signTransaction(transactionXdr, {
    networkPassphrase: getExpectedNetworkPassphrase(),
    address,
  });

  if (result.error || !result.signedTxXdr) {
    throw new Error(result.error ?? "Freighter did not return a signed transaction.");
  }

  return result.signedTxXdr;
}
