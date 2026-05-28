"use client";

import { useEffect, useState } from "react";
import QRLIB from "qrcode";

const qrCodeOptions = {
  width: 200,
  margin: 3,
  errorCorrectionLevel: "L",
};

const QrCode = ({ qrCode }) => {
  const [qrImage, setQrImage] = useState();

  useEffect(() => {
    if (!qrCode) {
      setQrImage(undefined);
      return;
    }

    QRLIB.toDataURL(qrCode, qrCodeOptions)
      .then((url) => {
        setQrImage(url);
      })
      .catch((err) => {
        console.error("Failed to generate QR code:", err);
        setQrImage(undefined);
      });
  }, [qrCode]);

  if (!qrImage) {
    return null;
  }

  return <img src={qrImage} alt="BankID QR Code" />;
};

export default QrCode;
