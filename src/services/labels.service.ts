import { DocxHelper } from "@src/common/helpers/docx.helper";
import { LogHelper } from "@src/common/helpers/log.helper";
import { ResponseHelper } from "@src/common/helpers/response.helper";
import { GenerateLabelsRequestBodyInterface } from "@src/common/interfaces/generate-labels-request-body.interface";
import { GenerateLabelsItemType } from "@src/common/types/generate-labels-item.type";

export class LabelsService {
    static async showLabelsForm() {
        try {
            return Bun.file("public/assets/html/generate-labels.html");
        } catch (e) {
            return ResponseHelper.getFatalErrorResponseData("LabelsService.showLabelsForm", e);
        }
    }

    static async generateLabels(labelsData: GenerateLabelsRequestBodyInterface[]) {
        try {
            if (!Array.isArray(labelsData) || !labelsData.length) {
                return ResponseHelper.getErrorResponseData("Labels data shouldn't be empty!");
            }

            const preparedData: GenerateLabelsItemType[] = [];
            labelsData.forEach((item) => {
                for (let i = 0; i < item.quantity; i++) {
                    preparedData.push({ model: item.model, size: item.size, description: item.description });
                }
            });

            const fileBuffer = await DocxHelper.generateLabelsDocumentBuffer(preparedData);
            const filePath = DocxHelper.saveLabelsFile(fileBuffer);

            return { filePath };
        } catch (e) {
            return ResponseHelper.getFatalErrorResponseData("LabelsService.generateLabels", e, { labelsData });
        }
    }
}
