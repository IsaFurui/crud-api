import { prisma } from "../utils/prisma";

interface GetTaskParams {
    query?: string
}

export async function getTaskService({ query }: GetTaskParams) {
    const get = await prisma.task.findMany({
        where: query ? {
            OR: [
                { title: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } }
            ]
        } : undefined
    })

    return {
        status: true,
        code: 200,
        msg: "Tasks found successfully!",
        data: get
    }
}