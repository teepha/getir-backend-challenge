import "babel-polyfill";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import requestLogger from "morgan";
import routes from "./routes";
import connectToDatabase from "./config/db";
import config from "./config";
import logger from "./config/logger";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../getir-backend-challenge.json";

let server;
const app = express();

app.enable("trust proxy");

// Enable Cross Origin Resource Sharing to all origins
app.use(cors());

// Log requests to the console.
app.use(requestLogger("dev"));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// api documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api", routes);

// error handlers
app.use("*", (req, res) =>
  res.status(404).json({
    message: "Route not found!",
  })
);

const connectionUrl = config.env === "test" ? config.db.test : config.db.dev;
// connect to database
connectToDatabase(connectionUrl)
  .then(() => {
    server = app.listen(config.port, () => {
      logger.info(`Server listening on port ${config.port} 🔥`);
    });
  })
  .catch((error) => console.log("An error occured. Unable to start server."));

export { app, server };
