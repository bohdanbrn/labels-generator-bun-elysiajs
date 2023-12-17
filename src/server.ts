import { SwaggerConfig } from "./configs/swagger.config";
import { labelsRoute } from "./routes/labels.route";
import { staticPlugin } from "@elysiajs/static";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";

export const app = new Elysia()
    .use(swagger(SwaggerConfig))
    .use(staticPlugin())
    .use(labelsRoute)
    .all("*", () => {
        return Bun.file("public/assets/html/404.html");
    })
    .listen(process.env.PORT ?? 3000, ({ hostname, port }) => {
        console.log(`Running at http://${hostname}:${port}`);
    });
