import { authCheckStatus, authLogin } from "@/core/actions/auth-actions"
import { User } from "@/core/auth/interface/user"
import { create } from 'zustand'


export type AuthStatus= 'authenticadted' | 'unauthenticadted' | 'checking'


export interface AuthState{
    status: AuthStatus,
    token?: string,
    user?: User

    login:(email:string, password: string)=>Promise<boolean>
    checkStatus: ()=> Promise<void>
    logout:()=> Promise<void>
}


export const useAuthStore = create <AuthState>()( (set) =>({
status: 'checking',
token:undefined,
user:undefined,

login: async (email:string, password: string) =>{

    const resp = await authLogin(email, password)

    if(!resp){
        set({status: 'unauthenticadted', token: undefined, user: undefined})
        return false
    }

    set({
        status: 'authenticadted',
        token: resp.token,
        user: resp.user
    })

    //TODO: guardar el token en el secure storage

    return true
},

checkStatus: async ()=>{
    const resp = await authCheckStatus()

    if(!resp){
        set({status: 'unauthenticadted', token: undefined, user: undefined})
return
    }

    set({
        status: 'authenticadted',
        token: resp.token,
        user: resp.user
    })

    return
},

logout: async()=>{
//TODO clear token del secure storage
set({ status: 'unauthenticadted', token:undefined, user: undefined})
}
}))


