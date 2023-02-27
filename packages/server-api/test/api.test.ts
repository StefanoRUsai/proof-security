import request from "supertest";

import app from "../src/app";

describe("GET /api/v1", () => {
  it("responds with a json message", (done) => {
    request(app)
      .get("/api/v1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(
        200,
        {
          message: "API - 👋🌎🌍🌏",
        },
        done
      );
  });
});

describe("GET /api/v1/emojis", () => {
  it("responds with a json message", (done) => {
    request(app)
      .get("/api/v1/emojis")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, ["😀", "😳", "🙄"], done);
  });
});

describe("GET /api/v1/data", () => {
  it("responds with a json message", (done) => {
    request(app)
      .get("/api/v1/data")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(
        200,
        [
          {
            id: 1,
            name: "sample-name-1",
          },
          {
            id: 2,
            name: "sample-name-2",
          },
        ],
        done
      );
  });
});
