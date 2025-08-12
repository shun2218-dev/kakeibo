import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/createUser.dto';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async findAll(@Res() res: Response<User[]>) {
    const users = await this.userService.findAll();
    return res.status(HttpStatus.OK).json(users);
  }

  @Post()
  @UseInterceptors(NoFilesInterceptor())
  async createUser(
    @Res() res: Response<User>,
    @Body() createUserDto: CreateUserDto,
  ) {
    console.log('Creating user with name:', createUserDto);
    if (!createUserDto.name) {
      throw new Error('Name is required');
    }
    const user = await this.userService.createUser(createUserDto);
    return res.status(HttpStatus.CREATED).json(user);
  }
}
