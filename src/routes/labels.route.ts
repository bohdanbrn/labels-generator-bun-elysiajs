import { RequestGenerateLabelsSchema } from "@src/schemas/labels/request-generate-labels.schema";
import { ResponseGenerateLabelsSchema } from "@src/schemas/labels/response-generate-labels.schema";
import { ResponseBaseErrorSchema } from "@src/schemas/response-base-error.schema";
import { LabelsService } from "@src/services/labels.service";
import { Elysia, t } from "elysia";

const labelsRoute = new Elysia({ prefix: "/labels" })
    .get("/", () => LabelsService.showLabelsForm(), { detail: { tags: ["Labels"] } })
    .post("/", ({ body }) => LabelsService.generateLabels(body.labels), {
        detail: { tags: ["Labels"] },
        body: RequestGenerateLabelsSchema,
        response: [ResponseGenerateLabelsSchema, ResponseBaseErrorSchema],
    });

export { labelsRoute };
