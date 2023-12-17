// color codes for console output
const colors = {
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    cyan: "\x1b[36m",
    gray: "\x1b[90m",
    reset: "\x1b[0m",
} as const;
type ColorType = (typeof colors)[keyof typeof colors];

export class LogHelper {
    private static getTimestamp(): string {
        return new Date().toLocaleString("en-GB", { timeZone: "UTC" }) + " UTC";
    }

    private static display(color: ColorType, message: string): void {
        console.error(`${color}${message}${colors.reset}`);
    }

    static error(message?: string, params?: any): void {
        message = `[ERROR] [${this.getTimestamp()}] ${message}`.trim();

        LogHelper.display(colors.red, message);

        if (params) {
            const paramsStr = "Params: " + JSON.stringify(params, null, 2);
            LogHelper.display(colors.red, paramsStr);
        }
    }

    static fatalError(message: string, e: any, params?: object): void {
        message = `[ERROR] [${this.getTimestamp()}] ${message}`.trim();

        LogHelper.display(colors.red, message);

        LogHelper.display(colors.red, e.message);
        LogHelper.display(colors.red, e.stack);

        if (params) {
            const paramsStr = "Params: " + JSON.stringify(params, null, 2);
            LogHelper.display(colors.red, paramsStr);
        }
    }
}
