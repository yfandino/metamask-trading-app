const request = require("supertest");
const app = require("../app");

const API_PREFIX = "/api/v0";
const WALLET = "0x7f6fd7797163d0a24f4f5a63b943ef1abdb8aa74"
const SIGNATURE = "0x5415ee02e1a91ae1cf8b24edf2bc9c17e40c9305f7a417438cde521eac4ea523767ab337ebdcd23b0a178b0b27fa174dfa2d40425f49dbeafd22cd62354116a41c"

describe("Test cases for auth", () => {
  test("GET /balance", async () => {
    const response = await request(app)
      .get(`${API_PREFIX}/balance`)
      .set('x-auth-signature', SIGNATURE)
      .set('x-auth-wallet', "0x7f6fd7797163d0a24f4f5a63b943ef1abdb8aa7");
    expect(response.statusCode).toBe(401);
  });
});

describe("Test cases for /balance", () => {
  test("GET /balance", async () => {
    const response = await request(app)
      .get(`${API_PREFIX}/balance`)
      .set('x-auth-signature', SIGNATURE)
      .set('x-auth-wallet', WALLET);
    expect(response.statusCode).toBe(200);
  });
});

describe("Test cases for /balance/deposit", () => {
  test("POST /balance - No body", async () => {
    const response = await request(app)
      .post(`${API_PREFIX}/balance/deposit`)
      .set('x-auth-signature', SIGNATURE)
      .set('x-auth-wallet', WALLET);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Amount is required");
  });

  test("POST /balance - No Token", async () => {
    const body = {
      amount: 100
    };

    const response = await request(app)
      .post(`${API_PREFIX}/balance/deposit`)
      .send(body)
      .set('x-auth-signature', SIGNATURE)
      .set('x-auth-wallet', WALLET);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Token is missing or your trying with wrong token");
  });

  test("POST /balance - Wrong token", async () => {
    const body = {
      amount: 100,
      token: "BTC"
    };

    const response = await request(app)
      .post(`${API_PREFIX}/balance/deposit`)
      .send(body)
      .set('x-auth-signature', SIGNATURE)
      .set('x-auth-wallet', WALLET);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Token is missing or your trying with wrong token");
  });

  test("POST /balance - Success", async () => {
    const body = {
      amount: 100,
      token: "ETH"
    };

    const response = await request(app)
      .post(`${API_PREFIX}/balance/deposit`)
      .send(body)
      .set('x-auth-signature', SIGNATURE)
      .set('x-auth-wallet', WALLET);
    expect(response.statusCode).toBe(200);
  });
});

