import { GenerateLabelsRequestBodyInterface } from "../interfaces/generate-labels-request-body.interface";

export type GenerateLabelsItemType = Pick<GenerateLabelsRequestBodyInterface, "model" | "size" | "description">;
