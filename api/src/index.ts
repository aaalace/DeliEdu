import express, { Application } from "express";
import dotenv from "dotenv"
import cors from "cors"
import router from "./routes";
import errorHandler from "./middleware/errorHandler";

dotenv.config()
const app: Application = express()

app.use(cors())
app.use(express.json())
app.use('', router)
app.use(errorHandler)

const port: number = Number(process.env.API_PORT);
app.listen(port, () => console.log(`Running http://localhost:${port}`));