import RecordRepository from "../repositories/RecordRepository";
import startOfDay from "date-fns/startOfDay";
import endOfDay from "date-fns/endOfDay";

const recordRepository = new RecordRepository();

class RecordService {
  /**
   * @description Fetch records service function
   * @param {object} options
   * @returns {array} allRecords
   */
  static async fetchRecords(options) {
    const { startDate, endDate, minCount, maxCount } = options;

    const projectPipeline = {
      $project: {
        _id: 0,
        key: 1,
        createdAt: 1,
        totalCount: {
          $sum: "$counts",
        },
      },
    };

    const matchPipeline = {
      $match: {
        createdAt: {
          $gte: startOfDay(new Date(startDate)),
          $lte: endOfDay(new Date(endDate)),
        },
        totalCount: {
          $gte: minCount,
          $lte: maxCount,
        },
      },
    };

    try {
      const allRecords = recordRepository.aggregation([
        projectPipeline,
        matchPipeline,
      ]);

      return allRecords;
    } catch (error) {
      throw error;
    }
  }
}

export default RecordService;
