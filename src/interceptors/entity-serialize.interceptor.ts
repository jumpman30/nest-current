import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { BaseModel } from '../interface/types';
import { plainToClass } from 'class-transformer';
import { UserDto } from '../dto/user.dto';

//TODO: you can use interceptors with RabbitMQ events: https://www.npmjs.com/package/@golevelup/nestjs-rabbitmq

export class EntitySerializeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<UserDto> | Promise<Observable<UserDto>> {
    const ctx = context.switchToHttp();
    const body = ctx.getRequest().body;
    return next.handle().pipe(
      map((data: BaseModel) => {
        console.log(data);
        return plainToClass(UserDto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
