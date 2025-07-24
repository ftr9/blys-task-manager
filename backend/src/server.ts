import "./config/loadEnv";
import app from "./app";

const PORT = process.env.PORT || 4050;
app.listen(PORT, () => {
  console.log(`Server has been started on PORT ${PORT}`);
});
