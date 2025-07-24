import * as dotenv from "dotenv";
import path from "node:path";

//load environment variables
dotenv.config({
  path: path.join(__dirname, "../../.env"),
});
