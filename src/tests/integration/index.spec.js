import supertest from "supertest";
import { app, server } from "../../app";
import connectToDatabase from "../../config/db";
import config from "../../config";

let connection;
let request;

beforeAll(async () => {
  connection = await connectToDatabase(config.db.test);
  request = supertest(app);
});

afterAll(async () => {
  await connection.disconnect();
  await server.close();
});

describe("home and 404 routes API GET", () => {
  test("should return welcome page successfully", async () => {
    const result = await request.get("/api");
    const { body, statusCode } = result;

    expect(body.message).toEqual("Welcome to the home page");
    expect(statusCode).toEqual(200);
  });

  test("should return an error if endpoint does not exist", async () => {
    const result = await request.get("/api/some-route");
    const { body, statusCode } = result;

    expect(body.message).toEqual("Route not found!");
    expect(statusCode).toEqual(404);
  });
});
