import "babel-polyfill";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import requestLogger from "morgan";
import routes from "./routes";
import connectToDatabase from "./config/db";
import config from "./config";
import logger from "./config/logger";

dotenv.config();

const app = express();

app.get("/status", (req, res) =>
  res.status(200).json({ message: "Welcome to the home page" })
);
app.enable("trust proxy");
// Enable Cross Origin Resource Sharing to all origins
app.use(cors());

// Log requests to the console.
app.use(requestLogger("dev"));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/api", routes);

// error handlers
app.use("*", (req, res) =>
  res.status(404).json({
    message: "Well, will you help build this route? 🤷🏼‍♂️",
  })
);

const connectionUrl = config.env === "test" ? config.db.test : config.db.dev;
// connect to database
connectToDatabase(connectionUrl)
  .then(() => {
    app.listen(config.port, () => {
      logger.info(`Server listening on port ${config.port} 🔥`);
    });
  })
  .catch((error) => console.log("An error occured. Unable to start server."));

export default app;
