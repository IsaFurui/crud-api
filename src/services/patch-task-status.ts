import { prisma } from "../utils/prisma";

interface PathTaskStatusParams {
    taskId: string
}

export async function pathTaskStatusService({ taskId }: PathTaskStatusParams) {
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

    // Retorna valor booleano
    const isCompleted = !!findTask.completed_at;

    const updateStatus = await prisma.task.update({
        where: { id: taskId },
        data: {
            completed_at: isCompleted ? null : new Date()
        }
    })

    return {
        status: true,
        code: 200,
        msg: "Task updated successfully!",
        data: updateStatus
    }
}