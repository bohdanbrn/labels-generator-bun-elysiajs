import { t } from "elysia";

const ResponseBaseErrorSchema = t.Object({
    success: t.Boolean(),
    error: t.String(),
});

export { ResponseBaseErrorSchema };
