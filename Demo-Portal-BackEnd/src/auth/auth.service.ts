import { Injectable,UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/schema/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) { }

  async signUp(email: string, name: string, password: string, roleName: string, isNewUser: boolean, lastLoggedIn: string): Promise<User> {
    // Check if user with the provided email already exists
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('Email is already in use');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await this.userService.create(email, name, hashedPassword, roleName, isNewUser, lastLoggedIn);
    return newUser;
  }

  async signIn(email: string, password: string): Promise<User> {
    // Find user by email
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email or password are invalid');
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Email or password are invalid');
    }

    return user;
  }
}
