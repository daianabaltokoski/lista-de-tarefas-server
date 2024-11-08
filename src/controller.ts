import { Express, Request, Response } from "express";
import dotenv from "dotenv";
import pg from 'pg'

dotenv.config();
const { Client } = pg
const password = process.env.PASSWORD || "";
const client = new Client({
    database: 'lista_de_tarefas',
    password
})
client.connect()

export async function listaTarefas (_req: Request, res: Response) {
    const dbRes = await client.query(
        'SELECT * FROM tarefas'
    )
    res.send(dbRes.rows);
  }

  export async function adicionaTarefa (req: Request, res: Response) {
    const tarefa = req.body
    await client.query(
        `INSERT INTO tarefas (tarefa, categoria, concluido) VALUES ($1, $2, $3);`,
        [tarefa.tarefa, tarefa.categoria, tarefa.concluido]
    )
    res.send(tarefa);
  }