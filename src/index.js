import mongoose from "mongoose";
import server from "./app";
import logger from "./config/logger";

mongoose.connection
  .on("connected", () => {
    logger.info(`Database connected!! 😎`);
  })
  .on("disconnected", () => {
    logger.warn("Database disconnected, server will close shortly");
    server.close();
  })
  .on("error", (error) => {
    logger.error(`Database error ${error.message}`);
  });

server.on("error", (error) => {
  logger.error(`${error.message}: ${error.stack}`);
});

process.on("SIGINT", () => {
  logger.warn("Shutting down server...");
  mongoose.connection.close(); // properly close db connection
  logger.info(`Server successfully shutdown at ${Date.now()}`);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  logger.error("There was an uncaught error", err);
  process.exit(1);
});
