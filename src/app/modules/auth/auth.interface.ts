export type ILoginUser = {
  id: string;
  password: string;
};
export type ILoginResponse = {
  accessToken: string;
  refreshToken?: string;
  needsPasswordChange: boolean;
};
export type IRefreshTokenResponse = {
  accessToken: string;
};
export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};
