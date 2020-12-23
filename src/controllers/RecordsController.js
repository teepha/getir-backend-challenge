import RecordService from "../services/RecordService";
import { response } from "../utils";
import logger from "../config/logger";

class RecordsController {
  /**
   * @description Get records controller function
   * @param {object} req
   * @param {object} res
   * @returns {object} response data
   */
  static async getRecords(req, res) {
    try {
      const { startDate, endDate, minCount, maxCount } = req.body;

      const records = await RecordService.fetchRecords({
        startDate,
        endDate,
        minCount,
        maxCount,
      });

      return response({ res, statusCode: 200, data: records });
    } catch (error) {
      const { message } = error;
      logger.error(message);
      return response({ res, statusCode: 500, message });
    }
  }
}

export default RecordsController;
