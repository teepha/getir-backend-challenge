import dotenv from "dotenv";

dotenv.config();

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 4000,
  logs: {
    label: process.env.LOG_LABEL,
    level: process.env.LOG_LEVEL,
    filename: process.env.LOG_FILE,
  },
  db: {
    test: process.env.DB_URL_TEST,
    dev: process.env.DB_URL,
  },
};

export default config;
