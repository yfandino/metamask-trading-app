const API_BASE_ENDPOINT = "http://localhost:5000/api/v0";

export async function getBalances (signature, account) {
  try {
    const response = await fetch(`${API_BASE_ENDPOINT}/balance`, {
      method: "GET",
      headers: {
        "x-auth-signature": signature,
        "x-auth-wallet": account
      }
    })
    const data = await response.json();

    return data.balances;
  } catch(e) {
    throw e;
  }
}

export async function deposit (signature, account, token, amount) {
  try {
    const response = await fetch(`${API_BASE_ENDPOINT}/balance/deposit`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "x-auth-signature": signature,
        "x-auth-wallet": account
      },
      body: JSON.stringify({ token, amount })
    })
    const data = await response.json();

    return data.balances;
  } catch(e) {
    throw e;
  }
}