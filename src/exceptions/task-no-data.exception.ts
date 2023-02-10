import { HttpException } from "./http.excpetion";

export class NotFoundTaskException extends HttpException {
  constructor() {
    super(400, `Task not found`);
  }
}
export class TaskTitleException extends HttpException {
  constructor(title: string, minCharacters: number, maxCharacters: number) {
    super(
      400,
      `Task with title: ${title} cannot be created. Title must contain between ${minCharacters} and ${maxCharacters} characters! Your title contain: ${title.length} characters.`
    );
  }
}
export class NoTaskTitleException extends HttpException {
  constructor() {
    super(400, `You didn't provide a title!`);
  }
}
