import { DocxHelper } from "@src/common/helpers/docx.helper";
import { LogHelper } from "@src/common/helpers/log.helper";
import { GenerateLabelsRequestBodyInterface } from "@src/common/interfaces/generate-labels-request-body.interface";
import { GenerateLabelsItemType } from "@src/common/types/generate-labels-item.type";
import * as fs from "fs";
import * as path from "path";

export class LabelsService {
    static async showLabelsForm() {
        try {
            return Bun.file("public/generate-labels.html");
        } catch (e) {
            return LogHelper.getFatalErrorResponseData(e);
        }
    }

    static async generateLabels(labelsData: GenerateLabelsRequestBodyInterface[]) {
        try {
            if (!Array.isArray(labelsData) || !labelsData.length) {
                return LogHelper.getErrorResponseData();
            }

            const preparedData: GenerateLabelsItemType[] = [];
            labelsData.forEach((item) => {
                for (let i = 0; i < item.quantity; i++) {
                    preparedData.push({ model: item.model, size: item.size, description: item.description });
                }
            });

            const filePath = path.join(import.meta.dir, "../../public/labels.docx");
            const documentBuffer = await DocxHelper.generateDocumentBuffer(preparedData);

            fs.writeFileSync(filePath, documentBuffer);

            return { filePath: "public/labels.docx" };

            // Google Drive
            // https://console.cloud.google.com/apis/library/drive.googleapis.com?authuser=1&project=barvamoda&supportedpurview=project
        } catch (e) {
            return LogHelper.getFatalErrorResponseData(e);
        }
    }
}
