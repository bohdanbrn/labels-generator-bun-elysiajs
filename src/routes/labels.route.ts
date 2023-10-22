import { Elysia } from "elysia";
import { LabelsService } from "../services/labels.service";

const labelsRoute = new Elysia({ prefix: "/labels" })
    .get("/", () => LabelsService.showLabelsForm())
    .post("/", ({ body }) => LabelsService.generateLabels(body));

export { labelsRoute };
