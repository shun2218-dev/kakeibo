import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(
    @Res() res: Response<{ message: string }>,
    @Query('name') name: string,
  ): Response<{ message: string }> {
    console.log('Received name:', name);
    return res
      .status(HttpStatus.OK)
      .json({ message: this.appService.getHello(name) });
  }
}
