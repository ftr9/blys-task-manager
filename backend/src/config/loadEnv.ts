import * as dotenv from "dotenv";
import path from "node:path";

/**
 * Load environment variables from .env file
 */
export const loadEnv = () => {
  dotenv.config({
    path: path.join(__dirname, "../../.env"),
  });

  // Validate required environment variables
  const requiredEnvVars = [
    'JWT_SECRET',
    'DB_HOST',
    'DB_USER',
    'DB_PASSWORD',
    'DB_NAME',
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
    process.exit(1);
  }
};
