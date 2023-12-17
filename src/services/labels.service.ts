import { DocxHelper } from "@src/common/helpers/docx.helper";
import { ResponseHelper } from "@src/common/helpers/response.helper";
import { GenerateLabelsRequestBodyInterface } from "@src/common/interfaces/generate-labels-request-body.interface";
import { GenerateLabelsItemType } from "@src/common/types/generate-labels-item.type";
import * as fs from "fs";
import * as path from "path";

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

            const filePath = path.join(import.meta.dir, "../../public/labels.docx");
            const documentBuffer = await DocxHelper.generateLabelsDocumentBuffer(preparedData);

            fs.writeFileSync(filePath, documentBuffer);

            return { filePath: "public/labels.docx" };

            // Google Drive
            // https://console.cloud.google.com/apis/library/drive.googleapis.com?authuser=1&project=barvamoda&supportedpurview=project
        } catch (e) {
            return ResponseHelper.getFatalErrorResponseData("LabelsService.generateLabels", e, { labelsData });
        }
    }
}
