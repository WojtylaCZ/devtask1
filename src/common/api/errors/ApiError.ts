export class ApiError extends Error {
  public status: number;
  public description?: string;
  constructor(message: string, status: number = 400, description?: string) {
    super(message);
    this.status = status;
    this.description = description;
  }
}
