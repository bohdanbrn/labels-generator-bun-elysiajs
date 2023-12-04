import { LogHelper } from "@src/common/helpers/log.helper";
import { LabelDataInterface } from "@src/common/interfaces/label-data.interface";
import { Document, ImageRun, Packer, Paragraph, Table, TableCell, TableRow } from "docx";
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

    static async generateLabels(labelsData: LabelDataInterface[]) {
        try {
            if (!Array.isArray(labelsData) || !labelsData.length) {
                return LogHelper.getErrorResponseData();
            }

            const preparedData: any[] = [];
            labelsData.forEach((item) => {
                for (let i = 0; i < item.quantity; i++) {
                    preparedData.push({ model: item.model, size: item.size, description: item.description });
                }
            });

            const image = new ImageRun({
                data: fs.readFileSync(path.join(import.meta.dir, "../../public/assets/images/label.png")),
                transformation: {
                    width: 200,
                    height: 74,
                },
                // floating: {
                //     horizontalPosition: { offset: 1014400 },
                //     verticalPosition: { offset: 1014400 },
                // },
            });

            const table = new Table({
                rows: preparedData.map((item) => {
                    return new TableRow({
                        children: [
                            new TableCell({ children: [new Paragraph({ children: [image] })] }),
                            new TableCell({ children: [new Paragraph(`Model: ${item.model}`)] }),
                            new TableCell({ children: [new Paragraph(`Size: ${item.size}`)] }),
                            new TableCell({ children: [new Paragraph(`Description: ${item.description}`)] }),
                        ],
                    });
                }),
            });

            const doc = new Document({
                sections: [{ children: [table] }],
            });

            const filePath = path.join(import.meta.dir, "../../public/labels.docx");
            const buffer = await Packer.toBuffer(doc);

            fs.writeFileSync(filePath, buffer);

            return { filePath: "public/labels.docx" };

            // Google Drive
            // https://console.cloud.google.com/apis/library/drive.googleapis.com?authuser=1&project=barvamoda&supportedpurview=project
        } catch (e) {
            return LogHelper.getFatalErrorResponseData(e);
        }
    }
}
