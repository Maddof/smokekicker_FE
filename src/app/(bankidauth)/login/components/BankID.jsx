// BankID Authentication Component from BANK Signering API
"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Spinner from "@/components/ui/custom/spinner";
import {
  pollAuthBanksignering,
  startBankSigneringAuth,
} from "@/lib/utils/bankid/bankidApi";
import BankIDButton from "@/components/bankid/BankIDButtons";
import QRImageSection from "./QRImageSection";
import { registerUser } from "@/lib/utils/auth/authApi";
import StatusDisplay from "@/components/bankid/statusDisplay";
import { isOfLegalAge } from "@/lib/utils/bankid/isOfLegalAge";
import createReturnUrl from "@/lib/utils/bankid/returnUrl";
import { ROUTES } from "@/config/routes";
import getDevice from "@/lib/utils/bankid/useDevice";

export default function BankIDBanksignering() {
  const searchParams = useSearchParams();

  const [orderRef, setOrderRef] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [hintCode, setHintCode] = useState("");
  const [qrImageUrl, setQrImageUrl] = useState("");
  const [qrEnabled, setQrEnabled] = useState(false);
  const [qrImageSrc, setQrImageSrc] = useState(""); // For the timestamped URL

  // Refs for intervals
  const authPollingRef = useRef(false);
  const qrIntervalId = useRef();

  // Function to create timestamped QR URL
  const createTimestampedQrUrl = (baseUrl) => {
    if (!baseUrl) return "";
    const timestamp = Date.now();
    return `${baseUrl}?${timestamp}`;
  };

  // Kick off BankID (shared between both flows)
  // QR image not needed when signing on same device
  const initAuth = async (needsQrImage = false) => {
    try {
      // Sending a request to the backend to initiate the BankID authentication flow
      const response = await startBankSigneringAuth(needsQrImage);
      const { orderRef, autoStartToken, qrImageUrl } = response;
      setOrderRef(orderRef);

      // If QR code was requested and returned, set it
      if (needsQrImage && qrImageUrl) {
        setQrImageUrl(qrImageUrl);
      }

      return { autoStartToken };
    } catch (err) {
      setError("Failed to initiate authentication.");
      console.error(err);
    }
  };

  // “Use BankID on another device” → enable QR mode
  const openOnOtherDevice = async () => {
    try {
      await initAuth(true); // True for requesting QR code
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

      const device = getDevice();

      let returnUrl;
      if (device.isAndroid) {
        returnUrl = "null"; // OBS: ingen encode här, du stoppar in rått "null"
      } else if (device.isIOS) {
        returnUrl = "null"; // iOS kräver också "null" för att inte försöka öppna en webbläsare efter BankID, men det är en best-effort lösning eftersom iOS alltid öppnar Safari oavsett standardwebbläsare. Det finns tyvärr ingen perfekt lösning för iOS när det gäller att återvända till rätt app efter BankID, så "null" är det säkraste valet för att undvika problem.
      } else {
        returnUrl = createReturnUrl(); // din befintliga logik (iOS best-effort osv)
      }

      // const returnUrl = createReturnUrl(); // Generate return URL
      const bankIdUrlDesktop = `bankid:///?autostarttoken=${autoStartToken}&redirect=${returnUrl}`;
      const bankIdUrlMobile = `https://app.bankid.com/?autostarttoken=${autoStartToken}&redirect=${returnUrl}`;

      // Need to check if the user's browser is running on a mobile or a desktop device
      // If on a desktop app we use bankIdUrlDesktop
      // Also need to check for stupid huawei browsers i guess
      let bankIdUrl;
      if (device.isHuaweiBrowser) {
        bankIdUrl = bankIdUrlDesktop;
      } else if (device.isMobileOrTablet) {
        bankIdUrl = bankIdUrlMobile;
      } else {
        // Fallback for desktop browsers
        bankIdUrl = `bankid:///?autostarttoken=${autoStartToken}&redirect=null`;
      }

      window.location.href = bankIdUrl; // Redirect the user to BankID app
    } catch (err) {
      console.error("Error in openOnThisDevice:", err);
    }
  };

  const handleRegistration = async (personalNumber, givenName, surname) => {
    try {
      const data = await registerUser(personalNumber, givenName, surname);
    } catch (error) {
      console.error("Registration error:", error);
      setError("Error registering user. Please try again.");
    }
  };

  const pollAuthStatus = async () => {
    // Stop polling if the component is unmounted
    if (!authPollingRef.current) return;

    try {
      const data = await pollAuthBanksignering(orderRef);
      setHintCode(data.HintCode);
      if (data.Status === "complete") {
        // If authentication is complete, display success message
        setStatus("Inloggning lyckades!");
        authPollingRef.current = false; // Stop polling
        setQrEnabled(false);
        const user = data.CompletionData.user;

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
        window.location.href = `${ROUTES.AUTH.SUCCESS}?returnUrl=${encodeURIComponent(returnUrl)}`;
      } else if (data.Status === "failed") {
        // If authentication failed, display failure message
        setStatus("Inloggning misslyckades.");
        authPollingRef.current = false; // Stop polling
        setQrEnabled(false);
        window.location.href = `${ROUTES.AUTH.FAILED}`;
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

  // Start QR image refresh interval
  const startQrRefresh = () => {
    if (qrIntervalId.current) {
      clearInterval(qrIntervalId.current);
    }

    // Update QR image immediately
    setQrImageSrc(createTimestampedQrUrl(qrImageUrl));

    // Set up interval to refresh every 2 seconds
    qrIntervalId.current = setInterval(() => {
      setQrImageSrc(createTimestampedQrUrl(qrImageUrl));
    }, 2000);
  };

  // Stop QR refresh interval
  const stopQrRefresh = () => {
    if (qrIntervalId.current) {
      clearInterval(qrIntervalId.current);
      qrIntervalId.current = null;
    }
  };

  // Effect to start/stop QR refresh when QR is enabled/disabled
  useEffect(() => {
    if (qrEnabled && qrImageUrl) {
      startQrRefresh();
    } else {
      stopQrRefresh();
    }

    // Cleanup on unmount
    return () => {
      stopQrRefresh();
    };
  }, [qrEnabled, qrImageUrl]);

  // Auth status polling effect

  useEffect(() => {
    if (!orderRef) return;
    if (orderRef) {
      authPollingRef.current = true; // Start polling when orderRef is set
      pollAuthStatus();
    }
    // Cleanup function to stop polling when the component unmounts
    return () => {
      authPollingRef.current = false;
    };
  }, [orderRef]);

  const abortAction = () => {
    // Reset all relevant states
    setOrderRef("");
    setStatus("");
    setError("");
    setHintCode("");
    setQrEnabled(false);
    setQrImageUrl("");
    setQrImageSrc("");
    authPollingRef.current = false;
  };

  return (
    <div className="flex w-full max-w-md flex-col items-center justify-center gap-4 p-4">
      {!orderRef && (
        <>
          <BankIDButton
            onClick={openOnThisDevice}
            label={"BankID på denna enhet"}
          />

          <BankIDButton
            onClick={openOnOtherDevice}
            label={"BankID på annan enhet"}
          />
        </>
      )}

      {/* Display QR Code when enabled and URL is available */}
      {qrEnabled && qrImageSrc && hintCode === "outstandingTransaction" && (
        <QRImageSection
          qrImageSrc={qrImageSrc}
          hintCode={hintCode}
          abortAction={abortAction}
          openOnThisDevice={openOnThisDevice}
        />
      )}

      {hintCode === "userSign" && <Spinner />}

      <StatusDisplay error={error} status={status} />
    </div>
  );
}
