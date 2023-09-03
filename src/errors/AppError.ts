/* eslint-disable @typescript-eslint/no-explicit-any */
export class AppError extends Error {
    public statusCode: number;
    public otherMessage: any;
    
    constructor(message: string, statusCode: number = 400, otherMessage?: any) {
        super(message);
        this.statusCode = statusCode;
        this.otherMessage = otherMessage;
    }
}
