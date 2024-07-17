import express, { Application } from "express";
import dotenv from "dotenv"
import cors from "cors"
import router from "./routes";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware";
import cookieParser from "cookie-parser";

dotenv.config()
const app: Application = express()

app.use(express.json())
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use('', router)
app.use(errorHandlerMiddleware)

const port: number = Number(process.env.API_PORT);
app.listen(port, () => console.log(`Running http://localhost:${port}`));