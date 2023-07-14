import { Request, Response } from "express";
import httpStatus from "http-status";
import AuthServiceInterface from "../services/interfaces/AuthServiceInterface";

class AuthController {

  private authService: AuthServiceInterface;

  constructor(service: AuthServiceInterface) {
    this.authService = service;
  }

  public async registration(request: Request, response: Response): Promise<Response> {
    const { email, password, password_confirmation } = request.body;
    const registrationObject = { email, password, password_confirmation };
    const registrationResponse = await this.authService.registerUser(registrationObject);
    return response.status(httpStatus.CREATED).json(registrationResponse);
  }

  public async confirmation(request: Request, response: Response): Promise<Response> {
    const { confirmation_token } = request.params;
    const confirmationResponse = await this.authService.confirmUser(confirmation_token);
    return response.status(httpStatus.OK).json(confirmationResponse);
  }

  public async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const loginObject = { email, password };
    const loginResponse = await this.authService.loginUser(loginObject);
    return response.status(httpStatus.OK).json(loginResponse);
  }

}

export default AuthController;