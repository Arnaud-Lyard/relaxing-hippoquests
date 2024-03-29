import { ILogoutResponse } from '../types/auth';
import { IServerResponse } from '../types/server';
import { HttpService } from './http.service';

const API_URL = import.meta.env.VITE_SERVER_API_URL;

export class AuthService extends HttpService {
  constructor() {
    super(API_URL);
  }

  async register({
    email,
    pseudo,
    password,
    passwordConfirm,
  }: {
    email: string;
    password: string;
    pseudo: string;
    passwordConfirm: string;
  }) {
    const { data } = await this.instance.post<IServerResponse>(
      `api/auth/register`,
      {
        email,
        password,
        pseudo,
        passwordConfirm,
      }
    );
    return data;
  }

  async login({ email, password }: { email: string; password: string }) {
    const { data } = await this.instance.post<IServerResponse>(
      `api/auth/login`,
      {
        email,
        password,
      }
    );
    return data;
  }

  async verifyEmail(verifyCode: string) {
    const { data } = await this.instance.get<IServerResponse>(
      `/api/auth/verifyemail/${verifyCode}`
    );
    return data;
  }

  async forgotPassword(email: string) {
    const { data } = await this.instance.post<IServerResponse>(
      `/api/auth/forgotpassword`,
      {
        email,
      }
    );
    return data;
  }

  async resetPassword({
    password,
    passwordConfirm,
    resetToken,
  }: {
    password: string;
    passwordConfirm: string;
    resetToken: string;
  }) {
    const { data } = await this.instance.patch<IServerResponse>(
      `/api/auth/resetpassword/${resetToken}`,
      {
        password,
        passwordConfirm,
      }
    );
    return data;
  }

  async logout() {
    const { data } = await this.instance.get<ILogoutResponse>(
      `/api/auth/logout`
    );
    return data;
  }
}

export const authService = new AuthService();
