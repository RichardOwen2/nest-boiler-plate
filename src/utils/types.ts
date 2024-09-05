export interface RequestWithUser extends Request {
  user: { id: string; email: string };
}

export interface INote {
  title: string;
  content?: string;
}