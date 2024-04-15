import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    return { user };
  }

  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string) {
    const user = await this.userService.findByEmail(email);
    return { user };
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updates: Partial<User>) {
    const user = await this.userService.updateUser(id, updates);
    return { message: 'User updated successfully', user };
  }
}
