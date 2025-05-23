import { authCheckStatus, authLogin } from "@/core/actions/auth-actions";
import { User } from "@/core/auth/interface/user";
import { SecureStorageAdapter } from '@/helpers/adapters/secure-storage.adapter';
import { create } from 'zustand';

export type AuthStatus= 'authenticadted' | 'unauthenticadted' | 'checking'


export interface AuthState{
    changeStatus(token: string | undefined, user: User | undefined): boolean | PromiseLike<boolean>;
    status: AuthStatus,
    token?: string,
    user?: User

    login:(email:string, password: string)=>Promise<boolean>
    checkStatus: ()=> Promise<void>
    logout:()=> Promise<void>
}


export const useAuthStore = create <AuthState>()( (set, get) =>({
    //Propertis
status: 'checking',
token:undefined,
user:undefined,


// Actions
  changeStatus: async (token?: string, user?: User) => {
    if (!token || !user) {
      set({ status: 'unauthenticadted', token: undefined, user: undefined });
      await SecureStorageAdapter.deleteItem('token');
      return false;
    }

    set({
      status: 'authenticadted',
      token: token,
      user: user,
    });

    await SecureStorageAdapter.setItem('token', token);

    return true;
  },

  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);
    return get().changeStatus(resp?.token, resp?.user);
  },

  checkStatus: async () => {
    const resp = await authCheckStatus();
    get().changeStatus(resp?.token, resp?.user);
  },

  logout: async () => {
    SecureStorageAdapter.deleteItem('token');

    set({ status: 'unauthenticadted', token: undefined, user: undefined });
  },
}));

