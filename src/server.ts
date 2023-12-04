import { staticPlugin } from "@elysiajs/static";
import { swagger } from "@elysiajs/swagger";
import { SwaggerConfig } from "./configs/swagger.config";
import { Elysia } from "elysia";
import { labelsRoute } from "./routes/labels.route";

export const app = new Elysia()
    .use(swagger(SwaggerConfig))
    .use(labelsRoute)
    .use(staticPlugin())
    .listen(process.env.PORT ?? 3000, ({ hostname, port }) => {
        console.log(`Running at http://${hostname}:${port}`);
    });
