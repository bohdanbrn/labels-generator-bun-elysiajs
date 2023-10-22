import { ElysiaSwaggerConfig } from "@elysiajs/swagger/src/types";

const SwaggerConfig: ElysiaSwaggerConfig = {
    path: "/docs",
    info: {
        title: "App Documentation",
        version: "1.0.0",
    },
    excludeStaticFile: true,
    exclude: ["/docs", "/docs/json"],
};

export { SwaggerConfig };
