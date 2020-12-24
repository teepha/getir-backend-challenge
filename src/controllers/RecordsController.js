import RecordService from "../services/RecordService";
import RecordRepository from "../repositories/RecordRepository";
import { formatResponse } from "../utils";
import logger from "../config/logger";

const recordRepository = new RecordRepository();
const recordService = new RecordService(recordRepository);

class RecordsController {
  static async getRecords(req, res) {
    try {
      const { startDate, endDate, minCount, maxCount } = req.body;

      const records = await recordService.fetchRecords({
        startDate,
        endDate,
        minCount,
        maxCount,
      });

      return formatResponse({ res, statusCode: 200, data: records });
    } catch (error) {
      const { message } = error;
      logger.error(message);
      return formatResponse({ res, statusCode: 500, message });
    }
  }
}

export default RecordsController;
