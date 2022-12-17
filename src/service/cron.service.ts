import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronService {
  constructor(public userService: UsersService) {}

  @Cron(CronExpression.EVERY_30_SECONDS, {
    name: 'test cronjob',
    timeZone: 'Europe/Lisbon',
  })
  handleCron() {
    //this.userService.create('Nat', 'Hromenko');
    console.log('Cronjob working');
  }
}
