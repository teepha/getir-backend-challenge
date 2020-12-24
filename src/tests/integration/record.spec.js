import supertest from "supertest";
import { app, server } from "../../app";
import connectToDatabase from "../../config/db";
import config from "../../config";
import {
  invalidPayloadWithNoStartDate,
  validPayload,
  payloadWithInvalidStartDate,
  invalidPayloadWithHigherMinimumCount,
  payloadWithInvalidMaxCount,
  invalidPayloadWithStartDateInFuture,
} from "../mocks/record";

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

describe("record API POST", () => {
  test("should return error with no start date in payload", async () => {
    const result = await request
      .post("/api/records")
      .send(invalidPayloadWithNoStartDate);
    const {
      body: { code, msg },
    } = result;

    expect(code).toEqual(1);
    expect(msg).toEqual("startDate is required");
  });

  test("should return error with invalid start date", async () => {
    const result = await request
      .post("/api/records")
      .send(payloadWithInvalidStartDate);
    const {
      body: { code, msg },
    } = result;

    expect(code).toEqual(1);
    expect(msg).toEqual("startDate must be a valid date");
  });

  test("should return error with start date is in the future", async () => {
    const result = await request
      .post("/api/records")
      .send(invalidPayloadWithStartDateInFuture);
    const {
      body: { code, msg },
    } = result;

    expect(code).toEqual(1);
    expect(msg).toEqual("startDate must be less than or equal to today");
  });

  test("should return error when minCount > maxCount", async () => {
    const result = await request
      .post("/api/records")
      .send(invalidPayloadWithHigherMinimumCount);
    const {
      body: { code, msg },
    } = result;

    expect(code).toEqual(1);
    expect(msg).toEqual("maxCount must be greater than minCount");
  });

  test("should return error when maxCount is not a number", async () => {
    const result = await request
      .post("/api/records")
      .send(payloadWithInvalidMaxCount);
    const {
      body: { code, msg },
    } = result;

    expect(code).toEqual(1);
    expect(msg).toEqual("maxCount must be number");
  });

  test("should return records with a valid payload", async () => {
    const result = await request.post("/api/records").send(validPayload);
    const {
      body: { code, msg, records },
    } = result;

    expect(code).toEqual(0);
    expect(msg).toEqual("Success");
    expect(records.length).toBeTruthy();
  });

  test("should return an error if database or server connection is lost", async () => {
    await connection.disconnect();
    await server.close();

    const result = await request.post("/api/records").send(validPayload);
    const {
      body: { code, msg },
    } = result;

    expect(code).toEqual(1);
    expect(msg).toEqual("Topology is closed, please connect");
  });
});
