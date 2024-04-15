import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) { }

  @Post('signup')
  async signUp(@Body('email') email: string, @Body('name') name: string, @Body('password') password: string, @Body('roleName') roleName: string, @Body('isNewUser') isNewUser: boolean, @Body('lastLoggedIn') lastLoggedIn: string) {
    const user = await this.authService.signUp(email, name, password, roleName, isNewUser, lastLoggedIn);
    const plainUser = user.toJSON(); // Convert user to plain object
    const token = await this.jwtService.sign(plainUser);
    return { message: 'User signed up successfully', token, user };
  }

  @Post('login')
  async signIn(@Body('email') email: string, @Body('password') password: string) {
    const user = await this.authService.signIn(email, password);
    const plainUser = user.toJSON(); // Convert user to plain object
    const token = await this.jwtService.sign(plainUser);
    // console.log("token", token)
    return { token, user };
  }
}
