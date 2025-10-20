import { Anixart } from "../client";
import {
    ILoginResponse,
    ILoginRequest,
    IRegisterRequest,
    IRegisterResponse,
    IRegisterVerifyRequest,
    IBaseApiParams,
    IRestorePasswordRequest,
    LoginResult,
    RegisterVerifyResult,
    RegisterResult,
    RestorePasswordResult,
    RestorePasswordVerifyResult
} from "../types";
export class Auth {
    public constructor(private readonly client: Anixart) { }

    public async signIn(data: ILoginRequest, options?: IBaseApiParams): Promise<ILoginResponse> {
        return this.client.call<LoginResult, ILoginResponse>({
            path: '/auth/signIn',
            urlEncoded: data,
            ...options
        });
    }

    public async signUp(data: IRegisterRequest, options?: IBaseApiParams): Promise<IRegisterResponse> {
        return this.client.call<RegisterResult, IRegisterResponse>({
            path: '/auth/signUp',
            urlEncoded: data,
            ...options
        })
    }

    public async signUpVerify(data: IRegisterVerifyRequest, options?: IBaseApiParams): Promise<ILoginResponse<RegisterVerifyResult>> {
        return this.client.call<RegisterVerifyResult, ILoginResponse<RegisterVerifyResult>>({
            path: '/auth/verify',
            urlEncoded: data,
            ...options
        })
    }

    public async restore(login: string, options?: IBaseApiParams): Promise<IRegisterResponse<RestorePasswordResult>> {
        return this.client.call<RestorePasswordResult, IRegisterResponse<RestorePasswordResult>>({
            path: '/auth/restore',
            urlEncoded: { data: login },
            ...options
        })
    }

    public async restoreVerify(data: IRestorePasswordRequest, options?: IBaseApiParams): Promise<ILoginResponse<RestorePasswordVerifyResult>> {
        return this.client.call<RestorePasswordVerifyResult, ILoginResponse<RestorePasswordVerifyResult>>({
            path: '/auth/restore/verify',
            urlEncoded: {
                data: data.username,
                password: data.password,
                code: data.code,
                hash: data.hash
            },
            ...options
        })
    }
}