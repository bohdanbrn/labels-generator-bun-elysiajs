import { GenerateLabelsItemType } from "../types/generate-labels-item.type";
import {
    BorderStyle,
    Document,
    IBordersOptions,
    ImageRun,
    Packer,
    Paragraph,
    Table,
    TableCell,
    TableRow,
    WidthType,
} from "docx";
import * as fs from "fs";
import * as path from "path";

export class DocxHelper {
    private static readonly brandImagePath = path.join(import.meta.dir, "../../../public/assets/images/label.png");

    static async generateDocumentBuffer(data: GenerateLabelsItemType[]): Promise<Buffer> {
        const table = DocxHelper.generateTable(data);
        const document = new Document({ sections: [{ children: [table] }] });

        return await Packer.toBuffer(document);
    }

    static generateTable(data: GenerateLabelsItemType[]) {
        return new Table({
            rows: data.map((item) => {
                return new TableRow({
                    children: [DocxHelper.generateTableCell(item)],
                });
            }),
            borders: DocxHelper.getZeroBorder(),
        });
    }

    static generateTableCell(data: GenerateLabelsItemType) {
        const brandImage = new ImageRun({
            data: fs.readFileSync(DocxHelper.brandImagePath),
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
                                        new Paragraph({ children: [brandImage], border: DocxHelper.getZeroBorder() }),
                                    ],
                                    borders: DocxHelper.getZeroBorder(),
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            text: `Model: ${data.model}`,
                                            border: DocxHelper.getZeroBorder(),
                                        }),
                                        new Paragraph({
                                            text: `Size: ${data.size}`,
                                            border: DocxHelper.getZeroBorder(),
                                        }),
                                        new Paragraph({
                                            text: `Description: ${data.description}`,
                                            border: DocxHelper.getZeroBorder(),
                                        }),
                                    ],
                                    borders: DocxHelper.getZeroBorder(),
                                }),
                            ],
                        }),
                    ],
                    borders: DocxHelper.getZeroBorder(),
                }),
            ],
            width: {
                size: 50,
                type: WidthType.PERCENTAGE,
            },
            borders: DocxHelper.getZeroBorder(),
        });
    }

    static getZeroBorder(): IBordersOptions {
        return {
            top: {
                style: BorderStyle.NONE,
                color: "ffffff",
                size: 0,
                space: 0,
            },
            bottom: {
                style: BorderStyle.NONE,
                color: "ffffff",
                size: 0,
                space: 0,
            },
            left: {
                style: BorderStyle.NONE,
                color: "ffffff",
                size: 0,
                space: 0,
            },
            right: {
                style: BorderStyle.NONE,
                color: "ffffff",
                size: 0,
                space: 0,
            },
        };
    }
}
