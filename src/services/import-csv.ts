import { parse } from 'csv-parse'
import { Readable } from 'node:stream'
import { prisma } from '../utils/prisma';

interface TaskCSV {
    title: string;
    description: string;
}

export async function importTasks(stream: Readable) {
    const tasks = await readCsv(stream)

    for (let task of tasks) {
        await prisma.task.create({
            data: {
                title: task.title,
                description: task.description
            }
        })
    }

    return {
        status: true,
        code: 200,
        msg: "Tasks inserted successfully!",
        data: tasks
    }
}

async function readCsv(stream: Readable): Promise<TaskCSV[]> {
    return new Promise((resolve, reject) => {
        const tasks: TaskCSV[] = []

        stream.setEncoding("latin1")

        stream.pipe(parse({
            columns: true, // Primeira linha do CSV são os nomes das colunas
            skip_empty_lines: true, // Ignora linhas vazias no CSV 
            trim: true, // Remove espacos no começo e fim dos valores
            delimiter: ";" // Delimita o CSV com ponto e virgula
        }))
            .on("data", (row: TaskCSV) => {
                tasks.push({
                    title: row.title,
                    description: row.description
                });
            })
            .on("end", () => resolve(tasks))
            .on("error", reject);
    });
}