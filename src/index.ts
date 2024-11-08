import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors"

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

app.get("/tasks", (req: Request, res: Response) => {
  res.send([]);
});

app.post("/tasks", (req: Request, res: Response) => {
  console.log(req.body);      // your JSON
  res.send(req.body);    // echo the result back
});

app.delete("/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(id)
  res.send("");
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});