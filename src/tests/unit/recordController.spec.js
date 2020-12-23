import "jest";

import RecordsController from "../../controllers/RecordsController";
import RecordService from "../../services/RecordService";
import { returnedRecords, request, successRes } from "../mocks/record";

jest.mock("../../services/RecordService");

describe("getRecords() controller", () => {
  test("should successfully return records", async () => {
    RecordService.fetchRecords = jest.fn().mockResolvedValue(returnedRecords);

    const result = await RecordsController.getRecords(request, successRes);
    const expectedOutput = {
      code: 0,
      msg: "Success",
      records: returnedRecords,
    };

    expect(result).toEqual(expectedOutput);
  });
});
