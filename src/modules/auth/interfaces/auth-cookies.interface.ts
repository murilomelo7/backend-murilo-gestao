export interface AuthCookies {
  refresh_token?: string;
}

export interface RequestWithCookies extends Request {
  cookies: AuthCookies;
}
