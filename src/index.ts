import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors"
import { listaTarefas, adicionaTarefa, deletaTarefa } from "./controller";


dotenv.config();

const app: Express = express();

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


app.use(cors(corsOptions));
app.use(express.json());
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/tasks", listaTarefas);

app.post("/tasks", adicionaTarefa);

app.delete("/tasks/:id", deletaTarefa)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});