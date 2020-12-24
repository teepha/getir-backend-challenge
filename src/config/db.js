import assert from "assert";
import mongoose from "mongoose";

const connectToDatabase = (connectionUrl) => {
  assert(
    typeof connectionUrl === "string" && connectionUrl.trim(),
    "DB connection string is required"
  );
  // These options avoid deprecation warnings
  const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  };

  const connection = mongoose.connect(connectionUrl, options);
  return connection;
};

export default connectToDatabase;
