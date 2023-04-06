import { UsersService } from '../service/users.service';
import { User } from '../entity/user.entity';
import { UpdateResult } from 'typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { DeleteUserDto } from '../dto/delete-user.dto';
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
export declare class UsersController {
    private readonly userService;
    private readonly amqpConnection;
    constructor(userService: UsersService, amqpConnection: AmqpConnection);
    create(userDto: CreateUserDto): Promise<User>;
    findByUsername(username: string): Promise<User>;
    updateUser(updateUserDto: UpdateUserDto): Promise<UpdateResult>;
    deleteUser(userDto: Partial<DeleteUserDto>): Promise<User>;
    findUser(id: string): Promise<User>;
    private publishUserCreationNotification;
}
