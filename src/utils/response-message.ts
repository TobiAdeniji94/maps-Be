export interface ResponseMessage {
    status?: boolean;
    message: string;
    error: string[]
    data: object;
}

export const responseMessage = (status?: boolean, message?: string, error?: string[], data?: object) => {
    return {
        status,
        message,
        error,
        data
    }
}