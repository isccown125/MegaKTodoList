import { HttpException } from "./http.excpetion";

export class NotFoundTaskException extends HttpException {
  constructor(id: string) {
    super(400, `Task with ${id} not found`);
  }
}
