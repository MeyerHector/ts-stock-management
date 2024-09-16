export type TCreateUser = {
  id?: string;
  username: string;
  password: string;
  role_id?: string;
};

export type TUpdateUser = Omit<TCreateUser, "password" | "role_id">;

export type TUserId = {
  id: string;
};
