import { prisma } from "../utils/prisma";

interface CreateTaskParams {
    title: string
    description: string
}

export async function createTaskService({ title, description }: CreateTaskParams) {
    const create = await prisma.task.create({
        data: {
            title,
            description
        }
    });

    return {
        status: true,
        code: 201,
        msg: "Task created successfully!",
        data: create
    }
}