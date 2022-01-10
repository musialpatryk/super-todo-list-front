
export interface IRestUser {
  username: string;
}

export interface IRestNote {
  id: number;
  name: string;
  description: string;
  priority: number;
  groupId: number;
}

export interface IRestGroup {
  id: number;
  name: string;
}
