import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';

@Injectable()
export class AppService {
  getHello(): User {
    return new User('jumpman', 'jumpman');
  }
}
