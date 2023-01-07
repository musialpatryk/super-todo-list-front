
export interface IRestUser {
  id: number;
  email: string;
  name: string;
  token: string;
  roles: ('admin' | 'user')[];
  invitation_link: string;
}

export interface IRestNote {
  id: number;
  name: string;
  description: string;
  priority: number;
  group_id: number;
}

export interface IRestGroup {
  id: number;
  name: string;
  administrator_id : number;
}
