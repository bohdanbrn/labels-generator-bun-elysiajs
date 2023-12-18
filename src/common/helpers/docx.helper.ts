import { GenerateLabelsItemType } from "../types/generate-labels-item.type";
import { CommonHelper } from "./common.helper";
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
import { LogHelper } from "./log.helper";

export class DocxHelper {
    private static readonly brandImagePath = path.join(import.meta.dir, "../../../public/assets/images/label.png");

    static saveLabelsFile(fileBuffer: Buffer): string | void {
        try {
            const fileName = `labels-${Date.now()}.docx`;
            const dirPath = `public/files`;
            const dirPathFull = path.join(import.meta.dir, "../../..", dirPath);
            const filePath = path.join(dirPathFull, `/${fileName}`);

            if (!fs.existsSync(dirPathFull)) {
                fs.mkdirSync(dirPathFull, { recursive: true });
            }

            const dirFiles = fs.readdirSync(dirPathFull);
            for (const dirFile of dirFiles) {
                fs.rmSync(path.join(dirPathFull, dirFile));
            }

            fs.writeFileSync(filePath, fileBuffer);

            return `${dirPath}/${fileName}`;
        } catch (e) {
            LogHelper.fatalError("DocxHelper.saveLabelsFile", e);
        }
    }

    static async generateLabelsDocumentBuffer(data: GenerateLabelsItemType[]): Promise<Buffer> {
        const dataPairs = CommonHelper.splitIntoPairs<GenerateLabelsItemType>(data);

        const table = DocxHelper.generateLabelsList(dataPairs);
        const document = new Document({
            sections: [
                {
                    children: [table],
                    properties: {
                        page: {
                            margin: {
                                top: 215,
                                bottom: 0,
                                right: 0,
                                left: 200,
                            },
                        },
                    },
                },
            ],
        });

        return await Packer.toBuffer(document);
    }

    static generateLabelsList(dataPairs: Array<[GenerateLabelsItemType, GenerateLabelsItemType?]>): Table {
        return new Table({
            rows: dataPairs.map((dataPair) => {
                const childrenData = [DocxHelper.generateSingleLabel(dataPair[0])];
                if (dataPair[1]) {
                    childrenData.push(DocxHelper.generateSingleLabel(dataPair[1]));
                }

                return new TableRow({
                    children: childrenData,
                });
            }),
            borders: DocxHelper.getZeroBorder(),
        });
    }

    static generateSingleLabel(data: GenerateLabelsItemType): TableCell {
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
                                    width: {
                                        size: 50,
                                        type: WidthType.PERCENTAGE,
                                    },
                                    borders: DocxHelper.getZeroBorder(),
                                }),
                                new TableCell({
                                    children: [
                                        this.generateSingleLabelDataItem("Model:", data.model),
                                        this.generateSingleLabelDataItem("Size:", data.size),
                                    ],
                                    width: {
                                        size: 50,
                                        type: WidthType.PERCENTAGE,
                                    },
                                    borders: DocxHelper.getZeroBorder(),
                                    margins: {
                                        left: 200,
                                        right: 200,
                                    },
                                }),
                            ],
                        }),
                    ],
                    borders: DocxHelper.getZeroBorder(),
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `(${data.description})`,
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
            margins: {
                left: 200,
                right: 200,
                bottom: 440,
            },
        });
    }

    static generateSingleLabelDataItem(title: string, value: string): Table {
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
                                            font: "Calibri",
                                            size: 52,
                                        }),
                                    ],
                                }),
                            ],
                            borders: DocxHelper.getZeroBorder(),
                            margins: {
                                left: 150,
                            },
                        }),
                    ],
                }),
            ],
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
