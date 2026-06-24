function GetURLParameter(sParam) {
  const params = new URLSearchParams(window.location.search);
  return params.get(sParam);
}

const base_grant_url = decodeURIComponent(GetURLParameter("base_grant_url") || "");
const user_continue_url = decodeURIComponent(GetURLParameter("user_continue_url") || "");
const node_mac = GetURLParameter("node_mac") || "";
const client_ip = GetURLParameter("client_ip") || "";
const client_mac = GetURLParameter("client_mac") || "";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwrnJD5DU7gCVDD6S0fYZi6Evj7W2pxNf6Y43zfJFOgHEV2IDHQ5dgCEbQr6tri1IjaFw/exec";

function authUser() {
  let loginUrl = base_grant_url;

  if (user_continue_url && user_continue_url !== "undefined") {
    loginUrl += "?continue_url=" + encodeURIComponent(user_continue_url);
  }

  window.location.href = loginUrl;
}

function login() {
  const data = {
    timestamp: new Date().toISOString(),
    node_mac,
    client_ip,
    client_mac,
    user_continue_url,
    base_grant_url
  };

  fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).finally(() => {
    authUser();
  });
}

document.getElementById("continue-btn").onclick = login;
