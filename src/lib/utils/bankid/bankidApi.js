const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function startBankIdAuth() {
  try {
    const response = await fetch(`${API_BASE_URL}/bankid/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to initiate authentication:", error);
    return {
      success: false,
      message: "Failed to initiate authentication",
    };
  }
}

async function pollAuth(orderRef) {
  try {
    const response = await fetch(`${API_BASE_URL}/bankid/collect`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderRef }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to poll auth:", error);
    return {
      success: false,
      message: "Failed to poll auth",
    };
  }
}

async function getQrCode(orderRef) {
  try {
    const response = await fetch(`${API_BASE_URL}/bankid/qr/${orderRef}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const { qrCode } = await response.json();
    // console.log("QR Code Data:", qrCode);
    return qrCode;
  } catch (error) {
    console.error("Failed to get QR code:", error);
    return null;
  }
}

// NEW API EXPORTS FOR USING BANKSIGNERING INSTEAD OF RP-API

async function startBankSigneringAuth(includeQrImageUrl = false) {
  try {
    const response = await fetch(`${API_BASE_URL}/bankid/authbanksignering`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ includeQrImageUrl }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to initiate BankSignering authentication:", error);
    return {
      success: false,
      message: "Failed to initiate BankSignering authentication",
    };
  }
}

async function pollAuthBanksignering(orderRef) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/bankid/authbanksignering/collect`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderRef }),
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to poll auth:", error);
    return {
      success: false,
      message: "Failed to poll auth",
    };
  }
}

export {
  startBankIdAuth,
  pollAuth,
  getQrCode,
  startBankSigneringAuth,
  pollAuthBanksignering,
};
