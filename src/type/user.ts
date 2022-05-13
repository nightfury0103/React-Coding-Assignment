export type UserInfo = {
  name: string;
  email: string;
  phone: string;
  website: string;
  backgroundNum: number;
};

export type UserState = {
  users: UserInfo[];
  loading: boolean;
};
