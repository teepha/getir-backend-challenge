import { connection } from "mongoose";

class BaseRepository {
  constructor(collectionName) {
    this.collectionName = collectionName;
  }

  async aggregation(pipelines) {
    try {
      const collection = await connection.db.collection(this.collectionName);
      const data = await collection.aggregate(pipelines).toArray();

      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default BaseRepository;
