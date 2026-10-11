export interface SessionUser {
  id: string;
  name: string;
  email: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export type AuthResult = { user: SessionUser } | { error: string };
