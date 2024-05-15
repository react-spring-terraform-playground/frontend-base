export class ApiError extends Error {
  constructor(message: string, cause: unknown) {
    super(message, { cause });

    if (cause instanceof Error && cause.stack !== undefined) {
      this.stack = this.stack + "\nCaused By: " + cause.stack;
    }
  }
}
