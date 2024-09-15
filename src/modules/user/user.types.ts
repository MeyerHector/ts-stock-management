export type TCreateUser = {
  id?: string;
  name: string;
  email: string;
  password: string;
  role_id: string;
};

export type TUpdateUser = {
  id?: string;
  name: string;
  email: string;
};
