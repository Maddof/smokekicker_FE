// Gets auth cookie from browser
export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2)
    return parts.pop().split(";").shift();
  return null;
};

// Sets a cookie in the browser
export const setCookie = (name, value, maxAgeSeconds) => {
  const isSecure = window.location.protocol === "https:";
  let cookie = `${name}=${value}; path=/; max-age=${maxAgeSeconds}; samesite=lax`;
  if (isSecure) cookie += "; secure";
  document.cookie = cookie;
};
