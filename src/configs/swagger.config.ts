import { ElysiaSwaggerConfig } from "@elysiajs/swagger/dist/types";

const SwaggerConfig = {
    path: "/docs",
    excludeStaticFile: true,
    exclude: ["/docs", "/docs/json"],
};

export { SwaggerConfig };
