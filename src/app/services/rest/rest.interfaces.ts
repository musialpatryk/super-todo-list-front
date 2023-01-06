
export interface IRestUser {
  id: number;
  email: string;
  name: string;
  token: string;
  invitation_link: string;
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
  administrator_id : number;
}
