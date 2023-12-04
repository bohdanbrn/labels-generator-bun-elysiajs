import { t } from "elysia";

const ResponseGenerateLabelsSchema = t.Object({
    filePath: t.String(),
});

export { ResponseGenerateLabelsSchema };
