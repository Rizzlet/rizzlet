import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: "http://127.0.0.1:8000",
    supportFile: false,
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    chromeWebSecurity: false,
  },

  env: {
    googleClientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleAuthCode: process.env.AUTH_CODE,
    googleRefreshToken: process.env.REFRESH_TOKEN,
  },
});
