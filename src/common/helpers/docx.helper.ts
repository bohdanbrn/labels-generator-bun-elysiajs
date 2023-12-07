import { GenerateLabelsItemType } from "../types/generate-labels-item.type";
import {
    AlignmentType,
    BorderStyle,
    Document,
    IBordersOptions,
    ImageRun,
    Packer,
    Paragraph,
    Table,
    TableCell,
    TableRow,
    TextRun,
    VerticalAlign,
    WidthType,
} from "docx";
import * as fs from "fs";
import * as path from "path";

export class DocxHelper {
    private static readonly brandImagePath = path.join(import.meta.dir, "../../../public/assets/images/label.png");

    static async generateLabelsDocumentBuffer(data: GenerateLabelsItemType[]): Promise<Buffer> {
        const table = DocxHelper.generateLabelsList(data);
        const document = new Document({
            sections: [
                {
                    children: [table],
                    properties: {
                        page: {
                            margin: {
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0,
                            },
                        },
                    },
                },
            ],
        });

        return await Packer.toBuffer(document);
    }

    static generateLabelsList(data: GenerateLabelsItemType[]) {
        return new Table({
            rows: data.map((item) => {
                return new TableRow({
                    children: [DocxHelper.generateSingleLabel(item)],
                });
            }),
            borders: DocxHelper.getZeroBorder(),
        });
    }

    static generateSingleLabel(data: GenerateLabelsItemType) {
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
                                        this.generateSingleLabelDataItem("Модель:", data.model),
                                        this.generateSingleLabelDataItem("Розмір:", data.size),
                                    ],
                                    borders: DocxHelper.getZeroBorder(),
                                }),
                            ],
                        }),
                        this.generateSingleLabelDescription(data.description),
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

    static generateSingleLabelDataItem(title: string, value: string) {
        return new Table({
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: title,
                                            bold: true,
                                            font: "Times New Roman",
                                            size: 24,
                                        }),
                                    ],
                                }),
                            ],
                            verticalAlign: VerticalAlign.CENTER,
                            borders: DocxHelper.getZeroBorder(),
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: value,
                                            bold: true,
                                            font: "Times New Roman",
                                            size: 52,
                                        }),
                                    ],
                                }),
                            ],
                            borders: DocxHelper.getZeroBorder(),
                        }),
                    ],
                }),
            ],
            borders: DocxHelper.getZeroBorder(),
        });
    }

    static generateSingleLabelDescription(labelDescription: string) {
        return new TableRow({
            children: [
                new TableCell({
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `(${labelDescription})`,
                                    bold: true,
                                    italics: true,
                                    font: "Times New Roman",
                                    size: 32,
                                }),
                            ],
                            alignment: AlignmentType.CENTER,
                        }),
                    ],
                    borders: DocxHelper.getZeroBorder(),
                }),
            ],
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
