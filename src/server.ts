import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { SwaggerConfig } from "./configs/swagger.config";
import { usersRoute } from "./routes/users.route";

const app = new Elysia()
    .use(swagger(SwaggerConfig))
    .use(usersRoute)
    .listen(process.env.PORT ?? 3000, ({ hostname, port }) => {
        console.log(`Running at http://${hostname}:${port}`);
    });
