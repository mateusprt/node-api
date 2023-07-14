import { Request, Response, Router } from "express";
import AuthController from "../../controllers/AuthController";
import AuthService from "../../services/implementations/AuthService";

const authRoutes = Router();
const authService = new AuthService();
const authController = new AuthController(authService);

authRoutes.post('/register', (request: Request, response: Response) => {
  return authController.registration(request, response);
});

authRoutes.post('/confirm/:confirmation_token', (request: Request, response: Response) => {
  return authController.confirmation(request, response);
});

authRoutes.post('/login', (request: Request, response: Response) => {
  return authController.login(request, response);
});


export default authRoutes;