// Here we create the URL that the BankID app should open when the authentication
// is completed. On iOS all links open in Safari, even when another browser is
// set as the default browser. So here we check if we're in another browser and
// if so we replace the protocol with one provided by the specific browser so we
// know it opens correctly. In some browsers we need to specify the full URL, in
// some we can just say "Go back to Chrome".

// import getDevice from "./useDevice";

const createReturnUrl = (device) => {
  const { origin, pathname, search } = window.location;
  const baseUrl = `${origin}${pathname}${search || ""}`;

  // Best effort för iOS Chrome
  if (device.isChromeOniOS) {
    const isHttps = window.location.protocol === "https:";
    const scheme = isHttps ? "googlechromes:" : "googlechrome:";
    const chromeUrl = baseUrl.replace(/^https?:/, scheme) + "#initiated=true";
    return encodeURIComponent(chromeUrl);
  }

  if (device.isFirefoxOniOS) {
    // Firefox iOS har också ett custom scheme, men beteendet varierar
    const fxUrl = `firefox://open-url?url=${encodeURIComponent(baseUrl)}#initiated=true`;
    return encodeURIComponent(fxUrl);
  }

  if (device.isOperaTouchOniOS) {
    const touchUrl =
      baseUrl
        .replace(/^https:/, "touch-https:")
        .replace(/^http:/, "touch-http:") + "#initiated=true";
    return encodeURIComponent(touchUrl);
  }

  // Android: skicka tillbaka till din egen https-sida (bäst)
  return encodeURIComponent(baseUrl + "#initiated=true");
};

// const createReturnUrl = () => {
//   const device = getDevice();
//   const baseUrl = `${window.location.href}`;
//   const { host, pathname, search, protocol } = window.location;

//   const chromeScheme = protocol === "https:" ? "googlechromes" : "googlechrome";
//   const chromeReturn = `${chromeScheme}://${host}${pathname}${search || ""}#initiated=true`;

//   if (device.isChromeOnAppleDevice) {
//     console.log("Device is Chrome on Apple device");
//     return encodeURIComponent(chromeReturn);
//   }
//   if (device.isFirefoxOnAppleDevice) {
//     console.log("Device is Firefox on Apple device");
//     return encodeURIComponent(
//       `firefox://${host}${pathname}${search || ""}#initiated=true`,
//     );
//   }
//   if (device.isOperaTouchOnAppleDevice) {
//     console.log("Device is Opera Touch on Apple device");
//     return encodeURIComponent(
//       `${baseUrl.replace("http", "touch-http")}#initiated=true`,
//     );
//   }
//   if (device.isChromeOnAndroid) {
//     console.log("Device is Chrome on Android");
//     return encodeURIComponent("googlechrome://");
//   }

//   // Default return URL for other browsers and devices (THIS WILL NEED ALOT MORE TESTING LATER)
//   console.log("Device is Default");
//   return encodeURIComponent(`${baseUrl}#initiated=true`);
// };

export default createReturnUrl;
