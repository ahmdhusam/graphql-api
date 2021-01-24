import dotenv from "dotenv";
import path from "path";
import log4js from "log4js";
import app from "./app";
import os from "os";

dotenv.config({ path: path.resolve(__dirname, "../.env") });
log4js.configure(path.resolve(__dirname, "./config/log4js.json"));

const { PORT = 5000 } = process.env;
app.listen(PORT, () =>
  console.info(`app running at http://${os.hostname()}:${PORT}`)
);
