import { prisma } from "../utils/prisma";

interface deleteTaskParams {
    taskId: string
}

export async function deleteTaskService({ taskId }: deleteTaskParams) {
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

    const deleteTask = await prisma.task.delete({
        where: { id: taskId }
    })

    return {
        status: true,
        code: 200,
        msg: "Task deleted successfully!",
        data: taskId
    }
}