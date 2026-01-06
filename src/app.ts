import fastify from "fastify";
import { routes } from "./routes/routes";
import multipart from "@fastify/multipart";

export const app = fastify()

app.register(multipart)
app.register(routes)
