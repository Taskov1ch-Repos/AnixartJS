import { IResponse } from "./response";
import { IProfile, IProfileToken } from "./profile";

export interface IRegisterRequest {
    username: string;
    password: string;
    email: string;
}

export interface IRegisterResponse extends IResponse {
    hash: string;
    codeTimestampExpires: number;
}

export interface IRegisterVerifyRequest extends IRegisterRequest {
    code: number;
    hash: string;
}

export interface IRestorePasswordRequest extends Omit<IRegisterVerifyRequest, "email"> {}

export interface ILoginRequest {
    login: string;
    password: string;
}
export interface ILoginResponse extends IResponse {
    profile: IProfile;
    profileToken: IProfileToken;
}