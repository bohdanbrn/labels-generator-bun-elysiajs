import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { SwaggerConfig } from "./configs/swagger.config";

const app = new Elysia()
    .use(swagger(SwaggerConfig))
    .get("/", () => "Hello Elysia")
    .listen(process.env.PORT);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
