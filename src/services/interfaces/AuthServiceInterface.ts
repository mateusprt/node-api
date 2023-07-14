import { LoginRequestDto, RegistrationRequestDto, ResponseDto, TokenResponseDto } from "../../dtos/authDtos";

interface AuthServiceInterface {
  registerUser(dto: RegistrationRequestDto): Promise<ResponseDto>
  confirmUser(confirmationToken: string): Promise<ResponseDto>
  loginUser(dto: LoginRequestDto): Promise<TokenResponseDto>
}

export default AuthServiceInterface;