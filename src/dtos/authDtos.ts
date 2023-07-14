import { string } from "joi";

export interface RegistrationRequestDto {
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface TokenResponseDto {
  token: string;
}

export interface ResponseDto {
  message: string
}