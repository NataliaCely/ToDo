export interface Task {
  createdAt:  string;
  state: boolean;
  title: string;
}
export interface TaskList {
  createdAt:  Date | number;
  state:      boolean | null | string;
  title:      string;
  id:         number;
  completed?: boolean;
  email?:     string;
  password?:  string;
}

