import { NotFoundError, t } from "elysia";
import { usersData } from "../data/users";

export class LabelsService {
    static async showLabelsForm() {
        try {
            return Bun.file("public/generate-labels.html");
        } catch (error) {
            console.error("Error! getForm:", error);
        }
    }

    static async generateLabels(data) {
        try {
            return data;

            // Google Drive
            // https://console.cloud.google.com/apis/library/drive.googleapis.com?authuser=1&project=barvamoda&supportedpurview=project

            return true;
        } catch (error) {
            console.error("Error! generateLabels:", error);
        }
    }
}
