export interface Response {
    success: boolean,
    message: string,
    status?: string,
    data: Record<string, unknown>
}