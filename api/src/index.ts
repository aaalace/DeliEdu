import express, {Application} from "express";

const port: number = 8080;

const app: Application = express()

app.get('/', (request: any, response: any): void => {
  response.send('omg works too');
});

app.listen(port, () => console.log(`Running - http://localhost:${port}`));