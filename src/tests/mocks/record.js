export const returnedRecords = [
  {
    key: "ibfRLaFT",
    createdAt: "2016-12-25T16:43:27.909Z",
    totalCount: 2892,
  },
  {
    key: "pxClAvll",
    createdAt: "2016-12-19T10:00:40.050Z",
    totalCount: 2772,
  },
];

export const validPayload = {
  startDate: "2016-01-26",
  endDate: "2018-02-02",
  minCount: 2700,
  maxCount: 3000,
};

export const invalidPayloadWithNoStartDate = {
  endDate: "2018-02-02",
  minCount: 2700,
  maxCount: 3000,
};

export const payloadWithInvalidMaxCount = {
  startDate: "2016-01-26",
  endDate: "2018-02-02",
  minCount: 2700,
  maxCount: "3000",
};

export const invalidPayloadWithStartDateInFuture = {
  startDate: "2026-01-26",
  endDate: "2018-02-02",
  minCount: 2700,
  maxCount: "3000",
};

export const payloadWithInvalidStartDate = {
  startDate: "2016-26",
  endDate: "2018-02-02",
  minCount: 2700,
  maxCount: 3000,
};

export const invalidPayloadWithHigherMinimumCount = {
  startDate: "2016-01-26",
  endDate: "2018-02-02",
  minCount: 3200,
  maxCount: 3000,
};

export const request = {
  body: validPayload,
};

export const successRes = {
  status: (statusCode) => ({
    json: () => ({
      code: 0,
      msg: "Success",
      records: returnedRecords,
    }),
  }),
};

export const mockedRecordRepository = {
  aggregation: () => returnedRecords,
};