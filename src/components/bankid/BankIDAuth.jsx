"use client";

import React, { useState, useEffect, useRef } from "react";
import createReturnUrl from "@/lib/utils/bankid/returnUrl";
import BankIDButton from "./BankIDButtons";
import { registerUser } from "@/lib/utils/auth/authApi";
import Spinner from "../ui/custom/spinner";
import useDevice from "@/lib/utils/bankid/useDevice";
import {
  startBankIdAuth,
  pollAuth,
  getQrCode,
} from "@/lib/utils/bankid/bankidApi";
import QRCodeSection from "./QRcodeSection";
import StatusDisplay from "./statusDisplay";
import { useSearchParams } from "next/navigation";
import { isOfLegalAge } from "@/lib/utils/bankid/isOfLegalAge";

const BankIDAuth = () => {
  const searchParams = useSearchParams();

  const [orderRef, setOrderRef] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [hintCode, setHintCode] = useState("");
  const [qrCodeData, setQrCodeData] = useState("");
  const [qrEnabled, setQrEnabled] = useState(false);

  // Refs for intervals
  const authPollingRef = useRef(false);
  const qrIntervalId = useRef();

  const [openBankIDUrl, setOpenBankIDUrl] = useState(null);

  // Kick off BankID (shared between both flows)
  const initAuth = async () => {
    try {
      // Sending a request to the backend to initiate the BankID authentication flow
      const { orderRef, autoStartToken } = await startBankIdAuth();
      setOrderRef(orderRef);

      return { autoStartToken };
    } catch (err) {
      setError("Failed to initiate authentication.");
      console.error(err);
    }
  };

  // “Use BankID on another device” → enable QR mode
  const openOnOtherDevice = async () => {
    try {
      await initAuth();
      setQrEnabled(true);
      authPollingRef.current = true; // start auth-status polling
    } catch {
      setError("Failed to start BankID on another device");
    }
  };

  // “Use BankID on this device” → deep-link flow (no QR)
  const openOnThisDevice = async () => {
    try {
      // Dont need myOrderRef here?
      const { autoStartToken } = await initAuth(); // Wait for the token from initAuth

      if (!autoStartToken) {
        setError("Failed to start authentication.");
        return;
      }
      const returnUrl = createReturnUrl(); // Generate return URL
      const bankIdUrlDesktop = `bankid:///?autostarttoken=${autoStartToken}&redirect=${returnUrl}`;
      const bankIdUrlMobile = `https://app.bankid.com/?autostarttoken=${autoStartToken}&redirect=${returnUrl}`;

      // Need to check if the user's browser is running on a mobile or a desktop device
      // If on a desktop app we use bankIdUrlDesktop
      // Also need to check for stupid huawei browsers i guess
      const { isHuaweiBrowser, isMobileOrTablet } = useDevice();
      let bankIdUrl;
      if (isHuaweiBrowser) {
        bankIdUrl = bankIdUrlDesktop;
      } else if (isMobileOrTablet) {
        bankIdUrl = bankIdUrlMobile;
      } else {
        // Fallback for desktop browsers
        bankIdUrl = `bankid:///?autostarttoken=${autoStartToken}&redirect=null`;
      }
      // const bankIdUrl = isMobileOrTablet ? bankIdUrlMobile : bankIdUrlDesktop;
      // TESTING HUAWEI INTERNET BROWSER

      // bankIdUrl = `bankid:///?autostarttoken=${autoStartToken}&redirect=null`;

      setOpenBankIDUrl(bankIdUrl);
      window.location.href = bankIdUrl; // Redirect the user to BankID app
    } catch (err) {
      console.error("Error in openOnThisDevice:", err);
    }
  };

  const handleRegistration = async (personalNumber, givenName, surname) => {
    try {
      const data = await registerUser(personalNumber, givenName, surname);
      // console.log("Registration successful:", data);
    } catch (error) {
      console.error("Registration error:", error);
      setError("Error registering user. Please try again.");
    }
  };

  const pollAuthStatus = async () => {
    // Stop polling if the component is unmounted
    if (!authPollingRef.current) return;

    try {
      const data = await pollAuth(orderRef);
      setHintCode(data.hintCode);
      if (data.status === "complete") {
        // If authentication is complete, display success message
        setStatus("Inloggning lyckades!");
        authPollingRef.current = false; // Stop polling
        setQrEnabled(false);
        // console.log("Completion Data: ", data.completionData);
        const user = data.completionData.user;

        // Check if user is of legal age
        if (!isOfLegalAge(user.personalNumber)) {
          setError("Du måste vara minst 18 år för att registrera dig.");
          authPollingRef.current = false;
          setQrEnabled(false);
          return;
        }

        // Register user
        await handleRegistration(
          user.personalNumber,
          user.givenName,
          user.surname,
        );

        // Get the returnUrl from query params, or default to homepage
        const returnUrl = searchParams.get("returnUrl") || "/";

        // Redirect to the success page
        window.location.href = `/bankidauth/success?returnUrl=${encodeURIComponent(returnUrl)}`;
      } else if (data.status === "failed") {
        // If authentication failed, display failure message
        setStatus("Inloggning misslyckades.");
        authPollingRef.current = false; // Stop polling
        setQrEnabled(false);
        window.location.href = "/bankidauth/failed";
      } else if (data.success === false) {
        // If the API call was unsuccessful, display the error message
        setError(data.message || "An error occurred during authentication.");
        authPollingRef.current = false; // Stop polling
        setQrEnabled(false);
      } else {
        // If status is pending, continue polling every 2 seconds
        setTimeout(pollAuthStatus, 2000);
      }
    } catch (err) {
      setError("Failed to collect authentication status.");
      console.error(err);
      authPollingRef.current = false; // Stop polling on error
      setQrEnabled(false);
    }
  };

  const abortAction = () => {
    setQrCodeData("");
    setOrderRef("");
    setStatus("");
    setError("");
    setHintCode("");
    setQrEnabled(false);
    authPollingRef.current = false;
    clearInterval(qrIntervalId.current);
  };

  useEffect(() => {
    if (!orderRef) return;
    if (orderRef) {
      authPollingRef.current = true; // Start polling when orderRef is set
      pollAuthStatus();
    }
    // Cleanup function to stop polling when the component unmounts
    return () => {
      authPollingRef.current = false;
      // console.log("unmounting polling");
    };
  }, [orderRef]);

  // QR-code polling effect
  useEffect(() => {
    if (!qrEnabled || !orderRef) return;

    // fetch immediately, then every second
    const fetchQr = async () => {
      try {
        const qrCode = await getQrCode(orderRef);
        setQrCodeData(qrCode);
      } catch (e) {
        console.error("QR fetch failed", e);
      }
    };
    fetchQr();
    qrIntervalId.current = setInterval(fetchQr, 1000);

    // cleanup
    return () => clearInterval(qrIntervalId.current);
  }, [qrEnabled, orderRef]);

  return (
    <div className="flex w-full max-w-md flex-col items-center justify-center gap-4 p-4">
      {!orderRef && (
        <>
          <BankIDButton
            onClick={openOnThisDevice}
            label={"BankID på denna enhet"}
          />

          {/* {openBankIDUrl && (
          <a
            href={openBankIDUrl}
            referrerPolicy="origin"
            className="button secondary guide-button"
          >
            OPEN SESAME
          </a>
        )} */}

          <BankIDButton
            onClick={openOnOtherDevice}
            label={"BankID på annan enhet"}
          />
        </>
      )}

      {qrEnabled && hintCode === "outstandingTransaction" && (
        <QRCodeSection
          qrCodeData={qrCodeData}
          hintCode={hintCode}
          abortAction={abortAction}
          openOnThisDevice={openOnThisDevice}
        />
      )}

      {hintCode === "userSign" && <Spinner />}

      <StatusDisplay error={error} status={status} />
    </div>
  );
};

export default BankIDAuth;
