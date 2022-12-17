import { Module } from '@nestjs/common';
import { UsersController } from '../controller/users.controller';
import { UsersService } from '../service/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { CronService } from '../service/cron.service';
import {RabbitmqModule} from "./rabbbitmq.module";
import {AmqpConnection} from "@golevelup/nestjs-rabbitmq";
import {props} from "../config/props";

@Module({
  imports: [RabbitmqModule,TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, CronService, {
    provide: AmqpConnection,
    useFactory: async () => {
      const connection = new AmqpConnection({name: 'rabbitmq-nest',
        uri: props.rabbit.host,
        exchanges: [{
          name: props.rabbit.resources.notification_exchange,
          type: props.rabbit.type,
        }]
      });
      await connection.init();
      return connection;
    },
  } ]
})
export class UsersModule {}
