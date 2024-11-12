import { Request, Response } from "express";
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

export default class TarefasController {

    public async listaTarefas(_req: Request, res: Response) {
        const dbRes = await client.query(
            'SELECT * FROM tarefas ORDER BY id DESC'
        )
        res.send(dbRes.rows);
    }

    public async adicionaTarefa(req: Request, res: Response) {
        const tarefa = req.body
        const respostaConsulta = await client.query(
            `INSERT INTO tarefas (tarefa, categoria, concluido) VALUES ($1, $2, $3) RETURNING id;`,
            [tarefa.tarefa, tarefa.categoria, tarefa.concluido]
        )

        tarefa.id = respostaConsulta.rows[0].id
        res.send(tarefa);
    }

    public async deletaTarefa(req: Request, res: Response) {
        const idTarefa = req.params.id
        await client.query(
            'DELETE FROM tarefas WHERE id = $1',
            [idTarefa]
        )
        res.send()
    }

    public async atualizaTarefa(req: Request, res: Response) {
        const idTarefa = req.params.id
        const tarefa = req.body
        await client.query(
            'UPDATE tarefas SET tarefa = $1, categoria = $2, concluido = $3 WHERE id = $4',
            [tarefa.tarefa, tarefa.categoria, tarefa.concluido, idTarefa]
        )
        res.send(tarefa)
    }
}