import startOfDay from "date-fns/startOfDay";
import endOfDay from "date-fns/endOfDay";

class RecordService {
  constructor(recordRepository) {
    this.recordRepository = recordRepository;
  }

  /**
   * @description Fetch records service function
   * @param {object} options
   * @returns {array} allRecords
   */
  async fetchRecords(options) {
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
      const allRecords = await this.recordRepository.aggregation([
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
