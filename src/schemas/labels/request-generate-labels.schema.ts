import { t } from "elysia";

const RequestGenerateLabelsSchema = t.Object({
    labels: t.Array(
        t.Object({
            model: t.String(),
            size: t.String(),
            description: t.String(),
            quantity: t.Number(),
        })
    ),
});

export { RequestGenerateLabelsSchema };
