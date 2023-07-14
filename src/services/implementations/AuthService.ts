import Joi from "joi";
import { compare, hash } from "bcryptjs";
import { PrismaClient, User } from "@prisma/client";
import { v4 as uuid } from "uuid";

import { LoginRequestDto, RegistrationRequestDto, ResponseDto, TokenResponseDto } from "../../dtos/authDtos";
import AppError from "../../exceptions/AppError";
import AuthServiceInterface from "../interfaces/AuthServiceInterface";
import JwtService from "./JwtService";

class AuthService implements AuthServiceInterface {

  async loginUser(dto: LoginRequestDto): Promise<TokenResponseDto> {
    const validationSchema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().min(5).required(),
    });

    const { error, } = validationSchema.validate(dto);

    if(error) {
      throw new AppError(error.message);
    }
    
    const user = await this.repository.user.findFirst({
      where: { email: dto.email }
    });

    if(!user) {
      throw new AppError("email or password are incorrect")
    }

    if(user.unconfirmed) {
      throw new AppError("email or password are incorrect")
    }

    const passwordMatch = await compare(dto.password, user.password);

    if(!passwordMatch) {
      throw new AppError("email or password are incorrect")
    }

    const tokenService = new JwtService();
    return { token: tokenService.generateToken(user.email) }
  }
  
  async confirmUser(confirmationToken: string): Promise<ResponseDto> {
    if(confirmationToken === '') {
      throw new AppError("invalid confirmation_token")
    }
    const user = await this.repository.user.findFirst({
      where: { confirmationToken: confirmationToken }
    });

    if(!user) {
      throw new AppError("User not found")
    }

    await this.repository.user.update({
      where: {
        email: user.email
      },
      data: {
        confirmationToken: null,
        confirmedAt: new Date(),
        unconfirmed: false,
      }
    })

    return { message: "Account confirmed successfully" }
  }

  repository: PrismaClient = new PrismaClient();

  async registerUser(dto: RegistrationRequestDto): Promise<ResponseDto> {

    const validationSchema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().min(5).required(),
      password_confirmation: Joi.string().min(5).required()
    });

    const { error, } = validationSchema.validate(dto);

    if(error) {
      throw new AppError(error.message);
    }

    if(dto.password !== dto.password_confirmation) {
      throw new AppError("password and password_confirmation doen't match")
    }

    const userAlreadyExists = await this.repository.user.findFirst({
      where: {
        email: dto.email
      }
    });

    if(userAlreadyExists) {
      throw new AppError("email already exists")
    }

    const hashedPassword = await hash(dto.password, 8);
    const confirmationToken = uuid();

    await this.repository.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        confirmationToken: confirmationToken,
        confirmationTokenSentAt: new Date()
      }
    })

    return { message: "Account created succesfully. A confirmation link was sent to your mail inbox. Please check." }
  }

}

export default AuthService;