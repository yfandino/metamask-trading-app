const request = require("supertest");
const app = require("../app");

const API_PREFIX = "/api/v0";
const SIGNATURE = ""

describe("Test cases for /balance", () => {
  test("GET /balance", async () => {
    const response = await request(app)
      .get(`${API_PREFIX}/balance`)
      .set('x-auth-signature', SIGNATURE);
    expect(response.statusCode).toBe(200);
  });
});

describe("Test cases for /balance/deposit", () => {
  test("POST /balance - No body", async () => {
    const response = await request(app)
      .post(`${API_PREFIX}/balance/deposit`)
      .set('x-auth-signature', SIGNATURE);
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
      .set('x-auth-signature', SIGNATURE);
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
      .set('x-auth-signature', SIGNATURE);
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
      .set('x-auth-signature', SIGNATURE);
    expect(response.statusCode).toBe(200);
  });
});

