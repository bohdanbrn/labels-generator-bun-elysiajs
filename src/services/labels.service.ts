import { DocxHelper } from "@src/common/helpers/docx.helper";
import { LogHelper } from "@src/common/helpers/log.helper";
import { GenerateLabelsRequestBodyInterface } from "@src/common/interfaces/generate-labels-request-body.interface";
import { GenerateLabelsItemType } from "@src/common/types/generate-labels-item.type";
import { BorderStyle, Document, ImageRun, Packer, Paragraph, Table, TableCell, TableRow } from "docx";
import * as fs from "fs";
import * as path from "path";

export class LabelsService {
    private static readonly brandImagePath = path.join(import.meta.dir, "../../public/assets/images/label.png");

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

            const table = LabelsService.generateTable(preparedData);
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

    static generateTable(data: GenerateLabelsItemType[]) {
        return new Table({
            rows: data.map((item) => {
                return new TableRow({
                    children: [LabelsService.generateTableCell(item)],
                });
            }),
            borders: DocxHelper.getTableBorder(),
        });
    }

    static generateTableCell(data: GenerateLabelsItemType) {
        const brandImage = new ImageRun({
            data: fs.readFileSync(LabelsService.brandImagePath),
            transformation: {
                width: 200,
                height: 74,
            },
        });

        return new TableCell({
            children: [
                new Table({
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    children: [
                                        new Paragraph({ children: [brandImage], border: DocxHelper.getTableBorder() }),
                                    ],
                                    borders: DocxHelper.getTableBorder(),
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph(`Model: ${data.model}`),
                                        new Paragraph(`Size: ${data.size}`),
                                        new Paragraph(`Description: ${data.description}`),
                                    ],
                                    borders: DocxHelper.getTableBorder(),
                                }),
                            ],
                        }),
                    ],
                    borders: DocxHelper.getTableBorder(),
                }),
            ],
        });
    }
}
