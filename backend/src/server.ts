import "./config/loadEnv";
import app from "./app";
import Logger from "./lib/logger";

const PORT = process.env.PORT || 4050;
app.listen(PORT, () => {
  Logger.info(`Server has been started on PORT ${PORT}`);
});
