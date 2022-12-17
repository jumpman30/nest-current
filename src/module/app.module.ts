import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users.module';
import { ReportsModule } from './reports.module';
import { Report } from '../entity/report.entity';
import { User } from '../entity/user.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      database: 'lapr4db',
      host: 'localhost',
      port: 3306,
      username: 'jumpman',
      password: '4525',
      entities: [Report, User],
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
    ScheduleModule.forRoot()
  ]
})
export class AppModule {}
