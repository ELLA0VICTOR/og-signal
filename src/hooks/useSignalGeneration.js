import { useState, useCallback } from "react";
import { useAccount } from "wagmi";
import { callOGLLM } from "../services/x402Service";
import { buildSignalPrompt } from "../services/promptService";
import { parseSignalResponse } from "../utils/signalParser";
import { useAppStore } from "../store/appStore";
import { LOADING_STEPS } from "../config/constants";

export function useSignalGeneration() {
  const { address } = useAccount();
  const [loadingStep, setLoadingStep] = useState(0);
  const { selectedPair, marketData, setSignalResult, setLoading, setError, isLoading } = useAppStore();

  const generateSignal = useCallback(async () => {
    if (!address || !marketData || isLoading) return;

    setLoading(true);
    setError(null);
    setSignalResult(null);
    setLoadingStep(0);

    try {
      setLoadingStep(1);
      const messages = buildSignalPrompt(selectedPair, marketData);

      setLoadingStep(2);
      const { content, txHash, model } = await callOGLLM({
        messages,
        maxTokens: 600,
      });

      setLoadingStep(3);
      const signal = parseSignalResponse(content);

      setLoadingStep(4);
      setSignalResult({
        ...signal,
        txHash,
        model,
        pair: selectedPair,
        generatedAt: new Date().toISOString(),
      });
    } catch (err) {
      if (err.message === "NO_METAMASK") {
        setError("Please install MetaMask to continue");
      } else if (err.message === "INSUFFICIENT_FUNDS") {
        setError(`Insufficient $OPG tokens. Get testnet tokens at faucet.opengradient.ai`);
      } else if (err.message?.includes("parse")) {
        setError("Signal parsing failed. The AI response was unexpected. Try again.");
      } else if (err.message?.includes("network") || err.message?.includes("fetch")) {
        setError("Network error. Check your connection and try again.");
      } else {
        setError(err.message || "Signal generation failed. Check your wallet has $OPG tokens on Base Sepolia.");
      }
    } finally {
      setLoading(false);
      setLoadingStep(0);
    }
  }, [address, marketData, selectedPair, isLoading]);

  return { generateSignal, loadingStep, loadingSteps: LOADING_STEPS };
}
