import { FastifyInstance } from "fastify";
import { TaskController } from "../controllers/task";

export function routes(app: FastifyInstance) {
    const taskController = new TaskController();

    app.post('/create', taskController.create);
    app.get('/get', taskController.get);
    app.put('/update/:id', taskController.update);
    app.delete('/delete/:id', taskController.delete);
    app.patch('/patch/:id', taskController.patch);
    app.post('/import-tasks', taskController.import);
}