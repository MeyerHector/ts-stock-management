export type TCreateUser = {
  id?: string;
  name: string;
  email: string;
  password: string;
  role_id?: string;
};

export type TUpdateUser = Omit<TCreateUser, "password" | "role_id">;

export type TUserId = {
  id: string;
};
