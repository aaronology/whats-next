export default interface Todo {
  title: string;
  description: string;
  due: Date;
  created: Date;
  archived: boolean;
  priority: string;
  id: string;
}
