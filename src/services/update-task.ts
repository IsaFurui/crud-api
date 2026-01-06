import { prisma } from "../utils/prisma";

interface UpdateTaskParams {
    taskId: string
    data: {
        title?: string
        description?: string
    }
}

export async function updateTaskService({ taskId, data }: UpdateTaskParams) {
    const findTask = await prisma.task.findUnique({
        where: {
            id: taskId
        }
    });

    if (!findTask) {
        return {
            status: false,
            code: 404,
            msg: "Task not found with id provided"
        }
    }

    const update = await prisma.task.update({
        where: { id: taskId },
        data
    })

    return {
        status: true,
        code: 200,
        msg: "Task updated successfully!",
        data: update
    }
}