import { Controller, Get } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { User } from '../entity/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): User {
    return this.appService.getHello();
  }
}
