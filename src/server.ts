import { SwaggerConfig } from "./configs/swagger.config";
import { labelsRoute } from "./routes/labels.route";
import { staticPlugin } from "@elysiajs/static";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";

export const app = new Elysia()
    .use(swagger(SwaggerConfig))
    .use(labelsRoute)
    .use(staticPlugin())
    .listen(process.env.PORT ?? 3000, ({ hostname, port }) => {
        console.log(`Running at http://${hostname}:${port}`);
    });
