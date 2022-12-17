import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserDto } from '../dto/user.dto';
export declare class EntitySerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<UserDto> | Promise<Observable<UserDto>>;
}
