import { LogHelper } from "./log.helper";

export class ResponseHelper {
    static getErrorResponseData(message?: string, params?: any): { success: boolean; error?: string } {
        LogHelper.error(message, params);

        return {
            success: false,
            error: message || undefined,
        };
    }

    static getFatalErrorResponseData(message: string, e: any, params?: object): { success: boolean; error: string } {
        LogHelper.fatalError(message, e, params);

        return {
            success: false,
            error: e.message,
        };
    }
}
