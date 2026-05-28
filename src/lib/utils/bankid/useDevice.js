/**
 * Here we've decided to outsource the detection of desktop/mobile for our redirect
 * to the library 'is-mobile'. At the time of writing this library is safe to use.
 * But you should always do your research and not use libraries you do not trust.
 */
import isMobileLib from "is-mobile";

const getDevice = () => {
  const userAgent = navigator.userAgent;

  const isMobileOrTablet = isMobileLib({ tablet: true, featureDetect: true });

  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const isChromeOniOS = /CriOS/i.test(userAgent);
  const isFirefoxOniOS = /FxiOS/i.test(userAgent);
  const isOperaTouchOniOS = /OPT/i.test(userAgent);

  // Android Chrome: undvik att "chrome" matchar massa webviews/andra browsers
  const isAndroid = /Android/i.test(userAgent);
  const isChromeOnAndroid =
    isAndroid &&
    /Chrome/i.test(userAgent) &&
    !/EdgA|OPR|SamsungBrowser|YaBrowser|UCBrowser/i.test(userAgent);

  const isHuaweiBrowser = /Huawei|HUAWEI|EMUI/i.test(userAgent);

  return {
    isMobileOrTablet,
    isIOS,
    isChromeOniOS,
    isFirefoxOniOS,
    isOperaTouchOniOS,
    isAndroid,
    isChromeOnAndroid,
    isHuaweiBrowser,
  };
};

// const getDevice = () => {
//   const userAgent = navigator.userAgent.toLowerCase();

//   const isMobileOrTablet = isMobileLib({ tablet: true, featureDetect: true });
//   const isChromeOnAppleDevice = Boolean(userAgent.match(/crios/));
//   const isFirefoxOnAppleDevice = Boolean(userAgent.match(/fxios/));
//   const isOperaTouchOnAppleDevice = Boolean(userAgent.match(/opt/));
//   const isChromeOnAndroid = Boolean(userAgent.match(/chrome|chromium/i));
//   const isHuaweiBrowser = userAgent.match(/huawei/) || userAgent.match(/emui/);

//   return {
//     isMobileOrTablet,
//     isChromeOnAppleDevice,
//     isChromeOnAndroid,
//     isFirefoxOnAppleDevice,
//     isOperaTouchOnAppleDevice,
//     isHuaweiBrowser,
//   };
// };

export default getDevice;
