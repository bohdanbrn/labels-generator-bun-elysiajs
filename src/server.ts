import { SwaggerConfig } from "./configs/swagger.config";
import { labelsRoute } from "./routes/labels.route";
import { staticPlugin } from "@elysiajs/static";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { ResponseHelper } from "./common/helpers/response.helper";

export const app = new Elysia()
    .use(swagger(SwaggerConfig))
    .use(staticPlugin())
    .use(labelsRoute)
    .all("*", () => {
        return Bun.file("public/assets/html/404.html");
    })
    .onError(({ error, path, params, body }) => {
        return ResponseHelper.getFatalErrorResponseData("Server", error, { path, params, body });
    })
    .listen(process.env.PORT ?? 3000, ({ hostname, port }) => {
        console.log(`Running at http://${hostname}:${port}`);
    });
