const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("../api/server");

// TEST CRITERIA
// http status codes (ex. 200, 401, 500)
// format of the data (JSON, XML)
// structure of the return data ({field: value})

describe("server.js", () => {
  it("env should be set to testing", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  afterAll(async () => {
    await db("users").truncate();
  });
});
