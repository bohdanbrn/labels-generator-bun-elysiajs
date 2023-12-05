import { BorderStyle } from "docx";

export class DocxHelper {
    static getTableBorder() {
        return {
            top: {
                style: BorderStyle.NONE,
            },
            bottom: {
                style: BorderStyle.NONE,
            },
            left: {
                style: BorderStyle.NONE,
            },
            right: {
                style: BorderStyle.NONE,
            },
        };
    }
}
