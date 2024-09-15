import dotenv from "dotenv";
dotenv.config();
type VE = string | undefined;
export const PORT: VE = process.env.PORT;
export const DB_NAME: VE = process.env.DB_NAME;
export const DB_USER: VE = process.env.DB_USER;
export const DB_PASS: VE = process.env.DB_PASS;
export const TOKEN_SECRET_KEY: VE = process.env.TOKEN_SECRET_KEY;
