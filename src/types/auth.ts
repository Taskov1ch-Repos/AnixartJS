import { IResponse } from "./response";
import { IProfile, IProfileToken } from "./profile";

export enum LoginResult {
    InvalidLogin = 2,
    InvalidPassword = 3
}

export enum RegisterResult {
    InvalidLogin = 2,
    InvalidEmail = 3,
    InvalidPassword = 4,
    LoginAlreadyTaken = 5,
    EmailAlreadyTaken = 6,
    CodeAlreadySend = 7,
    CodeCannotSend = 8,
    EmailServiceDisallowed = 9,
    TooManyRegistrations = 10
}

export enum RegisterVerifyResult {
    InvalidLogin = 2,
    InvalidEmail = 3,
    InvalidPassword = 4,
    LoginAlreadyTaken = 5,
    EmailAlreadyTaken = 6,
    CodeAlreadySend = 7,
    CodeCannotSend = 8,
    InvalidHash = 9,
    EmailServiceDisallowed = 10,
    TooManyRegistrations = 11
}

export enum RestorePasswordResult {
    ProfileNotFound = 2,
    CodeAlreadySend = 3,
    CodeCannotSend = 4
}

export enum RestorePasswordVerifyResult {
    ProfileNotFound = 2,
    InvalidPassword = 3,
    CodeInvalid = 4,
    CodeExpired = 5,
    InvalidHash = 6
}

export interface IRegisterRequest {
    username: string;
    password: string;
    email: string;
}

export interface IRegisterResponse<T extends number = RegisterResult> extends IResponse<T> {
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
export interface ILoginResponse<T extends number = LoginResult> extends IResponse<T> {
    profile: IProfile;
    profileToken: IProfileToken;
}