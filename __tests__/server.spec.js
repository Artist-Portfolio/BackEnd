const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("../api/server");

// TEST CRITERIA
// http status codes (ex. 200, 401, 500)
// format of the data (JSON, XML)
// structure of the return data ({field: value})

describe("server.js", () => {
  // it("env should be set to testing", () => {
  //   expect(process.env.DB_ENV).toBe("testing");
  // });

  afterAll(async () => {
    await db("users").truncate();
  });

  describe("POST /register", () => {
    it("should create user", () => {
      return request(server)
        .post("/api/auth/register")
        .send({
          username: "dangerousperson",
          password: "eagleshark",
          email: "dangerous@gmail.com"
        })
        .then(response => {
          expect(response.status).toBe(201);
          headers(response);
        });
    });

    it("should return JSON object", () => {
      return request(server)
        .post("/api/auth/register")
        .send({
          username: "dangerousperson",
          password: "eagleshark",
          email: "dangerous@gmail.com"
        })
        .then(response => {
          expect(response.type).toBe("application/json");
        });
    });

    it("should return 500 status code for missing field", () => {
      return request(server)
        .post("/api/auth/register")
        .send({
          username: "dangerousperson",
          password: "eagleshark",
          email: ""
        })
        .then(response => {
          expect(response.status).toBe(500);
          expect(response.type).toBe("application/json");
        });
    });
  });

  describe("POST /login", () => {
    it("should log user in", () => {
      return request(server)
        .post("/api/auth/login")
        .send({
          username: "dangerousperson",
          password: "eagleshark"
        })
        .then(response => {
          headers(response);
          expect(response.status).toBe(200);
        });
    });

    it("should return a JSON object", () => {
      return request(server)
        .post("/api/auth/login")
        .send({ username: "dangerousperson", password: "eagleshark" })
        .then(response => {
          expect(response.type).toBe("application/json");
        });
    });

    it("should return a 401 error for missing field", () => {
      return request(server)
        .post("/api/auth/login")
        .send({ username: "dangerousperson", password: "" })
        .then(response => {
          expect(response.status).toBe(401);
        });
    });
  });
});

function headers(res) {
  return expect(res.type).toBe("application/json");
}
