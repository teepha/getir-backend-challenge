import "jest";
import RecordService from "../../services/RecordService";
import {
  returnedRecords,
  request,
  mockedRecordRepository,
} from "../mocks/record";

jest.mock("../../repositories/RecordRepository");

const recordService = new RecordService(mockedRecordRepository);

describe("fetchRecords() service", () => {
  test("should return records successfully", async () => {
    const records = await recordService.fetchRecords(request.body);

    expect(records).toEqual(returnedRecords);
  });
});
