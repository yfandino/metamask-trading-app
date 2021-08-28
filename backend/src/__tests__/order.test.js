const request = require("supertest");
const app = require("../app");

const API_PREFIX = "/api/v0";
const SIGNATURE = ""

describe("Test cases for /order/all", () => {
  test("GET /order/all", async () => {
    const response = await request(app)
      .get(`${API_PREFIX}/order`)
      .set('x-auth-signature', SIGNATURE);
    expect(response.statusCode).toBe(200);
  });
});

describe("Test cases for /order", () => {
  test("POST /balance - No body", async () => {
    const response = await request(app)
      .post(`${API_PREFIX}/order`)
      .set('x-auth-signature', SIGNATURE);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Amount is required");
  });

  test("DELETE /balance - No body", async () => {
    const response = await request(app)
      .delete(`${API_PREFIX}/order`)
      .set('x-auth-signature', SIGNATURE);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Amount is required");
  });
});

