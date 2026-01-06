import { FastifyReply, FastifyRequest } from "fastify";
import z, { ZodError } from "zod";
import { createTaskService } from "../services/create-task";
import { formatZodError } from "../utils/format-zod-error";
import { getTaskService } from "../services/get-tasks";
import { updateTaskService } from "../services/update-task";
import { deleteTaskService } from "../services/delete-task";
import { pathTaskStatusService } from "../services/patch-task-status";
import { importTasks } from "../services/import-csv";

export class TaskController {
    async create(req: FastifyRequest, reply: FastifyReply) {
        try {
            const createTaskSchema = z.object({
                title: z.string(),
                description: z.string()
            });

            const { title, description } = createTaskSchema.parse(req.body);

            const create = await createTaskService({
                title,
                description
            });

            return reply.status(create.code).send(create);
        } catch (err) {
            if (err instanceof ZodError) {
                return reply.status(400).send(formatZodError(err))
            }

            return reply.status(500).send({
                status: false,
                code: 500,
                msg: "Unknown error on creating task"
            });
        }
    }

    async get(req: FastifyRequest, reply: FastifyReply) {
        try {
            const getTaskParamsSchema = z.object({
                query: z.string().optional(),
            });

            const { query } = getTaskParamsSchema.parse(req.query);

            const get = await getTaskService({
                query,
            });

            return reply.status(get.code).send(get);
        } catch (err) {
            if (err instanceof ZodError) {
                return reply.status(400).send(formatZodError(err))
            }

            return reply.status(500).send({
                status: false,
                code: 500,
                msg: "Unknown error on getting tasks"
            });
        }
    }

    async update(req: FastifyRequest, reply: FastifyReply) {
        try {
            const updateTaskPathParamsSchema = z.object({
                id: z.uuid(),
            });

            const { id } = updateTaskPathParamsSchema.parse(req.params);

            const updateTaskBodySchema = z.object({
                title: z.string().nonempty().optional(),
                description: z.string().nonempty().optional(),
            }).refine(
                (data) => data.title || data.description,
                {
                    message: "At least one field (title ou description) must be provided",
                }
            );

            const { title, description } = updateTaskBodySchema.parse(req.body);

            const update = await updateTaskService({
                taskId: id,
                data: {
                    title,
                    description
                }
            });

            return reply.status(update.code).send(update);
        } catch (err) {
            if (err instanceof ZodError) {
                return reply.status(400).send(formatZodError(err))
            }

            return reply.status(500).send({
                status: false,
                code: 500,
                msg: "Unknown error on updating task"
            });
        }
    }

    async delete(req: FastifyRequest, reply: FastifyReply) {
        try {
            const deleteTaskPathParamsSchema = z.object({
                id: z.uuid(),
            });

            const { id } = deleteTaskPathParamsSchema.parse(req.params);

            const deleteTask = await deleteTaskService({ taskId: id });

            return reply.status(deleteTask.code).send(deleteTask);
        } catch (err) {
            if (err instanceof ZodError) {
                return reply.status(400).send(formatZodError(err))
            }

            return reply.status(500).send({
                status: false,
                code: 500,
                msg: "Unknown error on deleting task"
            });
        }
    }

    async patch(req: FastifyRequest, reply: FastifyReply) {
        try {
            const patchTaskPathParamsSchema = z.object({
                id: z.uuid(),
            });

            const { id } = patchTaskPathParamsSchema.parse(req.params);

            const patchTask = await pathTaskStatusService({ taskId: id });

            return reply.status(patchTask.code).send(patchTask);
        } catch (err) {
            if (err instanceof ZodError) {
                return reply.status(400).send(formatZodError(err))
            }

            return reply.status(500).send({
                status: false,
                code: 500,
                msg: "Unknown error on updating task status"
            });
        }
    }

    async import(req: FastifyRequest, reply: FastifyReply) {
        try {
            const data = await req.file();

            if (!data) {
                return reply.status(400).send({
                    status: false,
                    code: 400,
                    msg: "Missing file field"
                })
            }

            const updateFile = await importTasks(data.file);

            return reply.status(200).send(updateFile);
        } catch (err) {
            if (err instanceof ZodError) {
                return reply.status(400).send(formatZodError(err))
            }

            return reply.status(500).send({
                status: false,
                code: 500,
                msg: "Unknown error on importing tasks"
            });
        }
    }
}