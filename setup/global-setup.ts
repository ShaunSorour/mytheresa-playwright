import dotenv from 'dotenv';
import { FullConfig } from '@playwright/test';
import { config as envConfig } from '../config/config.ts';


async function globalSetup(config: FullConfig) {
  console.log("<---- Setting ENV ---->");

  try {
    if (process.env.ENV) {
      console.log("ENV - Command line")
      dotenv.config({
        path: `env/.env.${process.env.ENV}`,
        override: true,
      });
    } else {
      console.log("ENV - Config file")
      for (const key in envConfig) {
        if (envConfig.hasOwnProperty(key)) {
          process.env[key] = envConfig[key];
        }
      }
    }
  } catch (error) {
    console.error("Error in loading environment variables", error);
  }
}

export default globalSetup;