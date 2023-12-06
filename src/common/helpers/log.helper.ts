export class LogHelper {
    static getErrorResponseData(message?: string, params?: any) {
        console.error(message);
        console.error({ params });

        return {
            success: false,
            error: message || undefined,
        };
    }

    static getFatalErrorResponseData(e: any, params?: object): { success: boolean; error: string } {
        console.error(e);
        console.error({ params });

        return {
            success: false,
            error: e.message,
        };
    }
}
